<template>
  <div class="fields container-fluid">
    <h3>
      <a
        href="https://developer.chrome.com/extensions/browsingData"
        target="_blank"
        >chrome.browsingData.remove</a
      >
    </h3>
    <p class="text">What should be removed?</p>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="appcache"
          v-model="appcache"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        Appcache
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="cache"
          v-model="cache"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        Cache
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="cookies"
          v-model="cookies"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        Cookies
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="downloads"
          v-model="downloads"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        Downloads
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="fileSystems"
          v-model="fileSystems"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        FileSystems
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="formData"
          v-model="formData"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        FormData
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="history"
          v-model="history"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        History
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="indexedDB"
          v-model="indexedDB"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        IndexedDB
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="serverBoundCertificates"
          v-model="serverBoundCertificates"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        ServerBoundCertificates
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="localStorage"
          v-model="localStorage"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        LocalStorage
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="pluginData"
          v-model="pluginData"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        PluginData
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="passwords"
          v-model="passwords"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        Passwords
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="webSQL"
          v-model="webSQL"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        WebSQL
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="serviceWorkers"
          v-model="serviceWorkers"
          class="form-check-input"
          type="checkbox"
          @change="saveSettings"
        />
        ServiceWorkers
      </label>
    </div>
    <br />
    <h3>
      <a
        href="https://developer.chrome.com/extensions/tabs#method-reload"
        target="_blank"
        >chrome.tabs.reload</a
      >
    </h3>
    <p class="text">Reload tabs after removing browser data?</p>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="refresh"
          v-model="refreshTabs"
          class="form-check-input"
          type="checkbox"
          @change="(removeTabs = false), saveSettings()"
        />
        Refresh Tabs
      </label>
    </div>
    <br />
    <h3>
      <a
        href="https://developer.chrome.com/extensions/tabs#method-remove"
        target="_blank"
        >chrome.tabs.remove</a
      >
    </h3>
    <p class="text">Remove tabs after removing browser data?</p>
    <div class="form-check">
      <label class="form-check-label">
        <input
          id="remove"
          v-model="removeTabs"
          class="form-check-input"
          type="checkbox"
          @change="(refreshTabs = false), saveSettings()"
        />
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
export default {
  components: {},
  data() {
    return {
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
  },
  created: function() {
    chrome.storage.sync.get(["options"], result => {
      if (result && result.options) {
        this.appcache = result.options.appcache;
        this.cache = result.options.cache;
        this.cookies = result.options.cookies;
        this.downloads = result.options.downloads;
        this.fileSystems = result.options.fileSystems;
        this.formData = result.options.formData;
        this.history = result.options.history;
        this.indexedDB = result.options.indexedDB;
        this.serverBoundCertificates = result.options.serverBoundCertificates;
        this.localStorage = result.options.localStorage;
        this.pluginData = result.options.pluginData;
        this.passwords = result.options.passwords;
        this.webSQL = result.options.webSQL;
        this.serviceWorkers = result.options.serviceWorkers;
      }
    });
    chrome.storage.sync.get(["tabs"], result => {
      if (result && result.tabs) {
        this.refreshTabs = result.tabs.refreshTabs;
        this.removeTabs = result.tabs.removeTabs;
      }
    });
  },
  methods: {
    saveSettings: function() {
      const options = {
        appcache: this.appcache,
        cache: this.cache,
        cookies: this.cookies,
        downloads: this.downloads,
        fileSystems: this.fileSystems,
        formData: this.formData,
        history: this.history,
        indexedDB: this.indexedDB,
        serverBoundCertificates: this.serverBoundCertificates,
        localStorage: this.localStorage,
        pluginData: this.pluginData,
        passwords: this.passwords,
        webSQL: this.webSQL,
        serviceWorkers: this.serviceWorkers
      };
      const tabs = {
        refreshTabs: this.refreshTabs,
        removeTabs: this.removeTabs
      };
      chrome.storage.sync.set({ options, tabs }, () => {
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
    removeHistory: function() {
      remove();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: black;
}

a:focus,
a:hover {
  text-decoration: none;
}

a:hover {
  color: red;
}

.text {
  color: red;
}

.btn {
  margin-bottom: 20px;
}
</style>
