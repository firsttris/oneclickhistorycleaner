import { t } from "./i18n/utils";

const isExtensionUrl = (url?: string) => {
  if (!url) return false;
  const extensionUrl = chrome.runtime.getURL("");
  return url.startsWith(extensionUrl);
};

export interface TabOptions {
  refreshMode?: "refresh_current" | "refresh_all" | "refresh_all_except_current" | "remove_all_tabs";
}

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

export const createNotification = async (message: string) => {
  await chrome.notifications.create("RRNotification", {
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: "One Click History Cleaner",
    message,
  });
};

const getOptions = async () => {
  const result = await chrome.storage.sync.get(["options"]);
  return (result.options as chrome.browsingData.DataTypeSet) || defaultOptions;
};

const removeBrowsingData = async (options: chrome.browsingData.DataTypeSet) => {
  await chrome.browsingData.remove({ since: 0 }, options);
};

const removeAllTabs = async (tabs: chrome.tabs.Tab[]) => {
  const tabIdsToRemove = tabs
    .filter(tab => tab.id && !isExtensionUrl(tab.url))
    .map(tab => tab.id!);

  if (tabIdsToRemove.length === 0) {
    return;
  }

  await chrome.tabs.create({ url: "chrome://newtab" });
  await chrome.tabs.remove(tabIdsToRemove);
};

const getActiveTabId = async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return activeTab?.id;
};

const reloadCurrentTab = async () => {
  const activeTabId = await getActiveTabId();
  if (!activeTabId) {
    return;
  }

  const activeTab = await chrome.tabs.get(activeTabId);
  if (isExtensionUrl(activeTab.url)) {
    return;
  }

  await chrome.tabs.reload(activeTabId);
};

const reloadAllTabsExceptCurrent = async (tabs: chrome.tabs.Tab[]) => {
  const activeTabId = await getActiveTabId();

  const reloadPromises = tabs
    .filter(tab => tab.id && !isExtensionUrl(tab.url) && tab.id !== activeTabId)
    .map(tab => chrome.tabs.reload(tab.id!));

  await Promise.all(reloadPromises);
};

const reloadAllTabs = async (tabs: chrome.tabs.Tab[]) => {
  const reloadPromises = tabs
    .filter(tab => tab.id && !isExtensionUrl(tab.url))
    .map(tab => chrome.tabs.reload(tab.id!));

  await Promise.all(reloadPromises);
};

const getRefreshMode = (tabOptions?: TabOptions) => {
  if (!tabOptions) {
    return "refresh_current";
  }

  if (tabOptions.refreshMode) {
    return tabOptions.refreshMode;
  }

  return "refresh_current";
};

const handleTabs = async () => {
  const { tabs: tabOptions } = await chrome.storage.sync.get(["tabs"]);

  const refreshMode = getRefreshMode(tabOptions as TabOptions | undefined);
  const normalTabs = await chrome.tabs.query({ windowType: "normal" });

  if (refreshMode === "remove_all_tabs") {
    await removeAllTabs(normalTabs);
  } else if (refreshMode === "refresh_all_except_current") {
    await reloadAllTabsExceptCurrent(normalTabs);
  } else if (refreshMode === "refresh_all") {
    await reloadAllTabs(normalTabs);
  } else {
    await reloadCurrentTab();
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const updateAndClearNotification = async () => {
  await delay(2000);
  // Firefox doesn't support notifications.update, so clear and create new one
  await chrome.notifications.clear("RRNotification");
  await createNotification(t('notification_cleaningDone'));
  await delay(1000);
  await chrome.notifications.clear("RRNotification");
};

export const clearHistory = async () => {
  try {
    await createNotification(t('notification_cleaning'));
    const options = await getOptions();
    await removeBrowsingData(options);
    await handleTabs();
    await updateAndClearNotification();
  } catch (error) {
    try {
      await chrome.notifications.create("RRNotification", {
        type: "basic",
        iconUrl: "icons/icon128.png",
        title: "One Click History Cleaner",
        message: "An error occurred during cleaning",
      });
    } catch (notificationError) {
      console.error("Failed to show error notification:", notificationError);
    }
  }
};
