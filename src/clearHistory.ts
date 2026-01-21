import { t } from "./i18n/utils";

const isExtensionUrl = (url?: string) => {
  if (!url) return false;
  const extensionUrl = chrome.runtime.getURL("");
  return url.startsWith(extensionUrl);
};

export interface TabOptions {
  removeTabs: boolean;
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

const removeTabs = async (tabs: chrome.tabs.Tab[]) => {
  const tabIdsToRemove = tabs
    .filter(tab => tab.id && !isExtensionUrl(tab.url))
    .map(tab => tab.id!);
  
  if (tabIdsToRemove.length > 0) {

    await chrome.tabs.create({ url: 'chrome://newtab' });
    await chrome.tabs.remove(tabIdsToRemove);
    // Open a new tab so Chrome does not exit
    
  }
};

const reloadTabs = async (tabs: chrome.tabs.Tab[]) => {
  const reloadPromises = tabs
    .filter(tab => tab.id && !isExtensionUrl(tab.url))
    .map(tab => chrome.tabs.reload(tab.id!));
  
  await Promise.all(reloadPromises);
};

const handleTabs = async () => {
  const { tabs: tabOptions } = await chrome.storage.sync.get(["tabs"]);
  if (!tabOptions) {
    return;
  }
  
  const typedTabOptions = tabOptions as TabOptions;
  const normalTabs = await chrome.tabs.query({ windowType: "normal" });
  
  if (typedTabOptions.removeTabs) {
    await removeTabs(normalTabs);
  } else {
    await reloadTabs(normalTabs);
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
