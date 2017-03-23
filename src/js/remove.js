function remove () {
  chrome.notifications.create('RRNotification', {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Remove&Reload',
    message: 'Cleaning Browser History...'
  }, () => {
    let options;
    chrome.storage.sync.get(["options"], (result) => {
      if (result && result.options) {
        options = result.options;
      } else {
        options = {
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
          webSQL: true
        };
      }
      chrome.browsingData.remove({
        since: 0
      }, options, () => {
        chrome.storage.sync.get(["tabs"], (result) => {
          if (result && result.tabs) {
            if (result.tabs.removeTabs && !result.tabs.refreshTabs) {
              chrome.tabs.query({windowType: 'normal'}, function (tabs) {
                chrome.tabs.create({}, function (tab) {
                  for (let index = 0; index < tabs.length; index++) {
                    if (!tabs[index].title.startsWith('chrome-extension')) {
                      chrome.tabs.remove(tabs[index].id);
                    }
                  }
                });
              });
            }
            if (!result.tabs.removeTabs && result.tabs.refreshTabs) {
              chrome.tabs.query({windowType: 'normal'}, function (tabs) {
                for (let index = 0; index < tabs.length; index++) {
                  if (!tabs[index].title.startsWith('chrome-extension')) {
                    chrome.tabs.reload(tabs[index].id);
                  }
                }
              });
            }
          }
        });
        //done
        setTimeout(() => {
          chrome.notifications.update('RRNotification', {
            message: 'Cleaning done...'
          }, () => {
            setTimeout(() => {
              chrome.notifications.clear('RRNotification');
            }, 1000);
          });
        }, 2000);
      });
    });
  });
}
module.exports = {remove};