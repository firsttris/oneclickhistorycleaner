<template>
    <div class="fields container-fluid">
        <h3><a href="https://developer.chrome.com/extensions/browsingData"
               target="_blank">chrome.browsingData.remove</a></h3>
        <p class="text">What should be removed?</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="appcache"
                       v-model="appcache" @click="saveSettings"> Appcache
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="cache" v-model="cache"
                       @click="saveSettings"> Cache
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="cookies" v-model="cookies"
                       @click="saveSettings"> Cookies
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="downloads"
                       v-model="downloads" @click="saveSettings"> Downloads
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="fileSystems"
                       v-model="fileSystems" @click="saveSettings"> FileSystems
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="formData"
                       v-model="formData" @click="saveSettings"> FormData
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="history" v-model="history"
                       @click="saveSettings"> History
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="indexedDB"
                       v-model="indexedDB" @click="saveSettings"> IndexedDB
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="serverBoundCertificates"
                       v-model="serverBoundCertificates" @click="saveSettings"> ServerBoundCertificates
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="localStorage"
                       v-model="localStorage" @click="saveSettings"> LocalStorage
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="pluginData"
                       v-model="pluginData" @click="saveSettings"> PluginData
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="passwords"
                       v-model="passwords" @click="saveSettings"> Passwords
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="webSQL" v-model="webSQL"
                       @click="saveSettings"> WebSQL
            </label>
        </div>
        <br>
        <h3><a href="https://developer.chrome.com/extensions/tabs#method-reload"
               target="_blank">chrome.tabs.reload</a></h3>
        <p class="text">Reload tabs after removing browser data?</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="refresh" v-model="refreshTabs"
                       @click="removeTabs = false,saveSettings()">
                Refresh Tabs
            </label>
        </div>
        <br>
        <h3><a href="https://developer.chrome.com/extensions/tabs#method-remove"
               target="_blank">chrome.tabs.remove</a></h3>
        <p class="text">Remove tabs after removing browser data?</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="remove" v-model="removeTabs"
                       @click="refreshTabs = false,saveSettings()">
                Remove Tabs
            </label>
        </div>
        <br>
        <button type="submit" class="btn btn-secondary" @click="removeHistory">Clean History</button>
    </div>
</template>

<script>
  import {remove} from './../js/remove';
  export default {
    components: {},
    data () {
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
        refreshTabs: false,
        removeTabs: false
      };
    },
    methods: {
      saveSettings: function () {
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
        };
        chrome.storage.sync.set({"options": options}, () => {
          chrome.notifications.create('RRNotification', {
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title: 'Remove&Reload',
            message: 'Settings Saved...'
          }, () => {
            setTimeout(() => {
              chrome.notifications.clear('RRNotification');
            }, 1000);
          });
        });
        const tabs = {
          refreshTabs: this.refreshTabs,
          removeTabs: this.removeTabs
        };
        chrome.storage.sync.set({"tabs": tabs}, () => {
        });
      },
      removeHistory: function () {
        remove();
      }
    },
    created: function () {
      chrome.storage.sync.get(["options"], (result) => {
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
        } else {
          chrome.storage.sync.set({"options": this.options}, () => {
          });
        }
      });
      chrome.storage.sync.get(["tabs"], (result) => {
        if (result && result.tabs) {
          this.refreshTabs = result.tabs.refreshTabs;
          this.removeTabs = result.tabs.removeTabs;
        } else {
          chrome.storage.sync.set({"tabs": this.tabs}, () => {
          });
        }
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a {
        color: black;
    }

    a:focus, a:hover {
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