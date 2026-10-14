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

/** Data types Chromium can keep for chosen sites (`excludeOrigins`); Firefox has no such option. */
const ORIGIN_FILTERABLE_DATA_TYPES: (keyof chrome.browsingData.DataTypeSet)[] = [
  'cache',
  'cacheStorage',
  'cookies',
  'fileSystems',
  'indexedDB',
  'localStorage',
  'serviceWorkers',
];

export const supportsSiteDataExclusions = import.meta.env.BROWSER !== 'firefox';

/** Optional permission, asked for when the first site is added, to keep history entries of excluded sites. */
export const HISTORY_PERMISSION: chrome.permissions.Permissions = { permissions: ['history'] };

/**
 * Turns user input like `https://www.github.com/foo`, `*.google.com` or `GitHub.com` into a domain
 * (`www.github.com`, `google.com`, `github.com`). Returns `undefined` if it isn't a valid domain.
 */
export const normalizeExclusion = (input: string): string | undefined => {
  const domain = input
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, '')
    .replace(/[/?#].*$/, '')
    .replace(/:\d+$/, '')
    .replace(/^\*\./, '')
    .replace(/\.$/, '');
  return /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(domain)
    ? domain
    : undefined;
};

/** A site matches an excluded domain if it is the domain itself or one of its subdomains. */
export const isExcludedHost = (host: string, exclusions: string[]) =>
  exclusions.some((domain) => host === domain || host.endsWith(`.${domain}`));

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

export const loadExclusions = async (): Promise<string[]> => {
  const { exclusions } = await chrome.storage.sync.get(['exclusions']);
  return Array.isArray(exclusions) ? exclusions.filter((domain): domain is string => typeof domain === 'string') : [];
};

const hostOf = (url?: string) => {
  try {
    return url ? new URL(url).hostname : undefined;
  } catch {
    return undefined;
  }
};

/** Every history entry: an empty search over all time. */
const getAllHistory = () => chrome.history.search({ text: '', startTime: 0, maxResults: 1_000_000 });

const toOrigins = (hosts: Iterable<string>) => [...hosts].flatMap((host) => [`https://${host}`, `http://${host}`]);

/**
 * Removes the selected data types but keeps what belongs to the excluded sites (and their subdomains):
 * - History entries, if the optional history permission was granted, in Chrome and Firefox.
 * - Cookies, site storage and cache via `excludeOrigins`, in Chromium only.
 * Downloads and form data are not tied to a site and are removed as usual.
 */
const removeBrowsingData = async (dataTypes: chrome.browsingData.DataTypeSet, exclusions: string[]) => {
  if (exclusions.length === 0) {
    await chrome.browsingData.remove({ since: 0 }, dataTypes);
    return;
  }

  const remaining = { ...dataTypes };
  const excludedHosts = new Set(exclusions.flatMap((domain) => [domain, `www.${domain}`]));

  const useHistory = remaining.history || supportsSiteDataExclusions;
  if (useHistory && (await chrome.permissions.contains(HISTORY_PERMISSION))) {
    const history = await getAllHistory();
    const toDelete: string[] = [];
    for (const item of history) {
      const host = hostOf(item.url);
      if (host && isExcludedHost(host, exclusions)) {
        // Subdomains seen in the history, so their site data can be kept as well
        excludedHosts.add(host);
      } else if (item.url) {
        toDelete.push(item.url);
      }
    }
    if (remaining.history) {
      await Promise.all(toDelete.map((url) => chrome.history.deleteUrl({ url })));
      remaining.history = false;
    }
  }

  if (supportsSiteDataExclusions) {
    const siteData = Object.fromEntries(
      ORIGIN_FILTERABLE_DATA_TYPES.filter((key) => remaining[key]).map((key) => [key, true])
    ) as chrome.browsingData.DataTypeSet;
    if (Object.keys(siteData).length > 0) {
      await chrome.browsingData.remove({ since: 0, excludeOrigins: toOrigins(excludedHosts) }, siteData);
      for (const key of Object.keys(siteData) as (keyof chrome.browsingData.DataTypeSet)[]) {
        remaining[key] = false;
      }
    }
  }

  if (Object.values(remaining).some(Boolean)) {
    await chrome.browsingData.remove({ since: 0 }, remaining);
  }
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

let running: Promise<boolean> | undefined;

/**
 * Removes the configured browsing data and applies the tab behavior. Resolves to `true` on success.
 * With `notify`, a single system notification reports the result; the options page shows a toast instead.
 * A call while a cleaning is still running joins it, so a double click doesn't clean (and notify) twice.
 */
export const clearHistory = ({ notify = false }: { notify?: boolean } = {}): Promise<boolean> => {
  running ??= runClearHistory(notify).finally(() => {
    running = undefined;
  });
  return running;
};

const runClearHistory = async (notify: boolean): Promise<boolean> => {
  try {
    await removeBrowsingData(toSupportedDataTypeSet(await loadOptions()), await loadExclusions());
    await handleTabs();
    if (notify) {
      await showNotification(t('notification_cleaningDone'));
      await delay(2500);
      await clearNotification();
    }
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    if (notify) {
      try {
        await showNotification(t('notification_cleaningFailed'));
      } catch (notificationError) {
        console.error('Failed to show error notification:', notificationError);
      }
    }
    return false;
  }
};
