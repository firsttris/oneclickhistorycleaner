import { t } from "./i18n/utils";

export const defaultOptions: chrome.browsingData.DataTypeSet = {
  appcache: true,
  cache: true,
  cookies: true,
  downloads: true,
  fileSystems: true,
  formData: true,
  history: true,
  indexedDB: true,
  serverBoundCertificates: true,
  localStorage: true,
  pluginData: true,
  passwords: true,
  webSQL: true,
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
  await chrome.tabs.create({});
  for (const tab of tabs) {
    if (tab?.id && !tab?.title?.startsWith("chrome-extension")) {
      await chrome.tabs.remove(tab?.id);
    }
  }
};

const reloadTabs = async (tabs: chrome.tabs.Tab[]) => {
  for (const tab of tabs) {
    if (!tab?.title?.startsWith("chrome-extension")) {
      await chrome.tabs.reload();
    }
  }
};

const handleTabs = async () => {
  const { tabs: tabOptions } = await chrome.storage.sync.get(["tabs"]);
  if (!tabOptions) {
    return;
  }
  const normalTabs = await chrome.tabs.query({ windowType: "normal" });
  if (tabOptions.removeTabs) {
    await removeTabs(normalTabs);
    return;
  } 
  await reloadTabs(normalTabs);
  
};

const updateAndClearNotification = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await chrome.notifications.update("RRNotification", {
    message: t('notification_cleaningDone'),
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await chrome.notifications.clear("RRNotification");
};

export const clearHistory = async () => {
  await createNotification(t('notification_cleaning'));
  const options = await getOptions();
  await removeBrowsingData(options);
  await handleTabs();
  await updateAndClearNotification();
};
