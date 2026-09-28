import { t } from './i18n/utils';

export const REFRESH_MODES = [
  'refresh_current',
  'refresh_all_except_current',
  'refresh_all',
  'remove_all_tabs',
] as const;

export type RefreshMode = (typeof REFRESH_MODES)[number];

export interface TabOptions {
  refreshMode?: RefreshMode;
}

export const DEFAULT_REFRESH_MODE: RefreshMode = 'refresh_current';

export const defaultOptions: chrome.browsingData.DataTypeSet = {
  cache: true,
  cacheStorage: true,
  cookies: true,
  downloads: true,
  fileSystems: true,
  formData: true,
  history: true,
  indexedDB: true,
  localStorage: true,
  serviceWorkers: true,
};

// Firefox rejects the whole browsingData.remove() call if the DataTypeSet contains a key it doesn't know,
// so nothing would be removed at all. These keys only exist in Chromium-based browsers.
const CHROMIUM_ONLY_DATA_TYPES: (keyof chrome.browsingData.DataTypeSet)[] = ['cacheStorage', 'fileSystems'];

export const supportedDataTypes = (Object.keys(defaultOptions) as (keyof chrome.browsingData.DataTypeSet)[]).filter(
  (key) => import.meta.env.BROWSER !== 'firefox' || !CHROMIUM_ONLY_DATA_TYPES.includes(key)
);

/** Only the data types the current browser supports, missing ones default to `false`. */
const toSupportedDataTypeSet = (options: chrome.browsingData.DataTypeSet) =>
  Object.fromEntries(supportedDataTypes.map((key) => [key, options[key] ?? false])) as chrome.browsingData.DataTypeSet;

const NOTIFICATION_ID = 'RRNotification';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isExtensionUrl = (url?: string) => !!url && url.startsWith(chrome.runtime.getURL(''));

/** Tabs that may be reloaded/closed: they have an id and are not one of our own pages. */
const getCleanableTabIds = (tabs: chrome.tabs.Tab[], excludeId?: number) =>
  tabs
    .filter((tab) => tab.id !== undefined && tab.id !== excludeId && !isExtensionUrl(tab.url))
    .map((tab) => tab.id as number);

export const showNotification = async (message: string) => {
  // Firefox doesn't support notifications.update, so clear and create a new one
  await chrome.notifications.clear(NOTIFICATION_ID);
  await chrome.notifications.create(NOTIFICATION_ID, {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'One Click History Cleaner',
    message,
  });
};

export const clearNotification = () => chrome.notifications.clear(NOTIFICATION_ID);

/** Stored options merged over the defaults, so data types added in later versions are picked up. */
export const loadOptions = async (): Promise<chrome.browsingData.DataTypeSet> => {
  const { options } = await chrome.storage.sync.get(['options']);
  return { ...defaultOptions, ...(options as chrome.browsingData.DataTypeSet | undefined) };
};

export const loadRefreshMode = async (): Promise<RefreshMode> => {
  const { tabs } = await chrome.storage.sync.get(['tabs']);
  const refreshMode = (tabs as TabOptions | undefined)?.refreshMode;
  return refreshMode && REFRESH_MODES.includes(refreshMode) ? refreshMode : DEFAULT_REFRESH_MODE;
};

const getActiveTabId = async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return activeTab?.id;
};

const removeAllTabs = async (tabs: chrome.tabs.Tab[]) => {
  const tabIds = getCleanableTabIds(tabs);
  if (tabIds.length === 0) {
    return;
  }

  // Open the browser's default new tab page first so the window stays open.
  // An explicit "chrome://newtab" URL is not allowed in Firefox.
  await chrome.tabs.create({});
  await chrome.tabs.remove(tabIds);
};

const reloadTabs = (tabIds: number[]) => Promise.all(tabIds.map((id) => chrome.tabs.reload(id)));

const handleTabs = async () => {
  const refreshMode = await loadRefreshMode();
  const normalTabs = await chrome.tabs.query({ windowType: 'normal' });

  switch (refreshMode) {
    case 'remove_all_tabs':
      await removeAllTabs(normalTabs);
      break;
    case 'refresh_all':
      await reloadTabs(getCleanableTabIds(normalTabs));
      break;
    case 'refresh_all_except_current':
      await reloadTabs(getCleanableTabIds(normalTabs, await getActiveTabId()));
      break;
    default: {
      const activeTabId = await getActiveTabId();
      const activeTab = normalTabs.find((tab) => tab.id === activeTabId);
      if (activeTab) {
        await reloadTabs(getCleanableTabIds([activeTab]));
      }
    }
  }
};

/** Removes the configured browsing data and applies the tab behavior. Resolves to `true` on success. */
export const clearHistory = async (): Promise<boolean> => {
  try {
    await showNotification(t('notification_cleaning'));
    await chrome.browsingData.remove({ since: 0 }, toSupportedDataTypeSet(await loadOptions()));
    await handleTabs();
    await delay(1000);
    await showNotification(t('notification_cleaningDone'));
    await delay(1500);
    await clearNotification();
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    try {
      await showNotification(t('notification_cleaningFailed'));
    } catch (notificationError) {
      console.error('Failed to show error notification:', notificationError);
    }
    return false;
  }
};
