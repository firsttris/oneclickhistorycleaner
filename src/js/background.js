chrome.browserAction.onClicked.addListener(function () {
  let options = {
    "appcache": true,
    "cache": true,
    "cookies": true,
    "downloads": true,
    "fileSystems": true,
    "formData": true,
    "history": true,
    "indexedDB": true,
    "localStorage": true,
    "pluginData": true,
    "passwords": true,
    "webSQL": true
  };
  chrome.storage.sync.get(["options"], (result) => {
    if (result.options) {
      options = result.options;
    }
    chrome.browsingData.remove({
      "since": 0
    }, {
      "appcache": true,
      "cache": true,
      "cookies": true,
      "downloads": true,
      "fileSystems": true,
      "formData": true,
      "history": true,
      "indexedDB": true,
      "localStorage": true,
      "pluginData": true,
      "passwords": true,
      "webSQL": true
    }, () => {
      if (options.remove) {
        chrome.tabs.query({windowType: 'normal'}, function (tabs) {
          chrome.tabs.create({}, function (tab) {
            for (const index in tabs) {
              chrome.tabs.remove(tabs[index].id);
            }
          });
        });
      }
      if (options.refresh) {
        chrome.tabs.query({windowType: 'normal'}, function (tabs) {
          for (const index in tabs) {
            chrome.tabs.reload(tabs[index].id);
          }
        });
      }
    });
  });
});