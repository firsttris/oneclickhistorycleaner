const defaultOptions = {
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
  serviceWorkers: true
};

const createNotification = async () => {
  await chrome.notifications.create("RRNotification", {
    type: "basic",
    iconUrl: "img/icon128.png",
    title: "Remove&Reload",
    message: "Cleaning Browser History..."
  });
};

const getOptions = async () => {
  const { options } = await chrome.storage.sync.get(["options"]);
  return options || defaultOptions;
};

const removeBrowsingData = async (options) => {
  await chrome.browsingData.remove({ since: 0 }, options);
};

const removeTabs = async (tabs) => {
  await chrome.tabs.create({});
  for (const tab of tabs) {
    if (!tab.title.startsWith("chrome-extension")) {
      await chrome.tabs.remove(tab.id);
    }
  }
};

const reloadTabs = async (tabs) => {
  for (const tab of tabs) {
    if (!tab.title.startsWith("chrome-extension")) {
      await chrome.tabs.reload(tab.id);
    }
  }
};

const handleTabs = async () => {
  const { tabs: tabOptions } = await chrome.storage.sync.get(["tabs"]);
  if (tabOptions) {
    const normalTabs = await chrome.tabs.query({ windowType: "normal" });
    if (tabOptions.removeTabs && !tabOptions.refreshTabs) {
      await removeTabs(normalTabs);
    }
    if (!tabOptions.removeTabs && tabOptions.refreshTabs) {
      await reloadTabs(normalTabs);
    }
  }
};

const updateAndClearNotification = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  await chrome.notifications.update("RRNotification", {
    message: "Cleaning done..."
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await chrome.notifications.clear("RRNotification");
};

export const remove = async () => {
  await createNotification();
  const options = await getOptions();
  await removeBrowsingData(options);
  await handleTabs();
  await updateAndClearNotification();
};