<template>
  <div class="fields container-fluid">
    <h3>
      <a class="text-decoration-none text-dark" href="https://developer.chrome.com/extensions/browsingData" target="_blank">chrome.browsingData.remove</a>
    </h3>
    <p class="text">What should be removed?</p>
    <div class="form-check" v-for="(value, key) in options" :key="key">
      <label class="form-check-label">
        <input :id="key" v-model="options[key]" class="form-check-input" type="checkbox" @change="saveSettings" />
        {{ getLabel(key) }}
      </label>
    </div>
    <br />
    <h3>
      <a href="https://developer.chrome.com/extensions/tabs#method-reload" target="_blank">chrome.tabs.reload</a>
    </h3>
    <p class="text">Reload tabs after removing browser data?</p>
    <div class="form-check">
      <label class="form-check-label">
        <input id="refresh" v-model="refreshTabs" class="form-check-input" type="checkbox"
          @change="(removeTabs = false), saveSettings()" />
        Refresh Tabs
      </label>
    </div>
    <br />
    <h3>
      <a href="https://developer.chrome.com/extensions/tabs#method-remove" target="_blank">chrome.tabs.remove</a>
    </h3>
    <p class="text">Remove tabs after removing browser data?</p>
    <div class="form-check">
      <label class="form-check-label">
        <input id="remove" v-model="removeTabs" class="form-check-input" type="checkbox"
          @change="(refreshTabs = false), saveSettings()" />
        Remove Tabs
      </label>
    </div>
    <br />
    <button type="submit" class="btn btn-secondary" @click="removeHistory">
      Clean History
    </button>
  </div>
</template>

<script>
import { remove } from "./../js/remove";
import { getLabel } from "./../js/label";

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
      serviceWorkers: true,
      refreshTabs: false,
      removeTabs: false
    };

export default {
  data() {
    return {
      refreshTabs: false,
      removeTabs: false,
      options: defaultOptions
    };
  },
  created: function () {
    chrome.storage.sync.get(["options"], result => {
      if (result?.options) {

        this.options = { ...this.options, ...result?.options }
      }
    });
    chrome.storage.sync.get(["tabs"], result => {
      if (result?.tabs) {
        this.refreshTabs = result.tabs.refreshTabs;
        this.removeTabs = result.tabs.removeTabs;
      }
    });
  },
  methods: {
    getLabel,
    saveSettings: function () {
      chrome.storage.sync.set({
        options: this.options, tabs: {
          refreshTabs: this.refreshTabs,
          removeTabs: this.removeTabs
        }
      }, () => {
        chrome.notifications.create(
          "RRNotification",
          {
            type: "basic",
            iconUrl: "img/icon128.png",
            title: "Remove&Reload",
            message: "Settings Saved..."
          },
          () => {
            setTimeout(() => {
              chrome.notifications.clear("RRNotification");
            }, 1000);
          }
        );
      });
    },
    removeHistory: function () {
      remove();
    }
  }
};
</script>
