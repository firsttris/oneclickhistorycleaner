<template>
    <div class="fields container">
        <h3><a href="https://developer.chrome.com/extensions/browsingData"
               target="_blank">chrome.browsingData.remove()</a></h3>
        <p>remove browsingData</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="appcache" value="appcache"
                       v-model="appcache"> appcache
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="cache" value="cache" v-model="cache"> cache
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="cookies" value="cookies" v-model="cookies">
                cookies
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="downloads" value="downloads"
                       v-model="downloads"> downloads
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="fileSystems" value="fileSystems"
                       v-model="fileSystems"> fileSystems
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="formData" value="formData"
                       v-model="formData"> formData
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="history" value="history" v-model="history">
                history
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="indexedDB" value="indexedDB"
                       v-model="indexedDB"> indexedDB
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="localStorage" value="localStorage"
                       v-model="localStorage"> localStorage
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="pluginData" value="pluginData"
                       v-model="pluginData"> pluginData
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="passwords" value="passwords"
                       v-model="passwords"> passwords
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="webSQL" value="webSQL" v-model="webSQL">
                webSQL
            </label>
        </div>
        <br>
        <h3><a href="https://developer.chrome.com/extensions/tabs#method-reload"
               target="_blank">chrome.tabs.reload()</a></h3>
        <p>reload tabs after removing browsingData</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="refresh" value="refresh" v-model="refreshTabs" @click="removeTabs = false">
                refresh tabs
            </label>
        </div>
        <br>
        <h3><a href="https://developer.chrome.com/extensions/tabs#method-remove"
               target="_blank">chrome.tabs.remove()</a></h3>
        <p>remove tabs after removing browsingData</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="remove" value="remove" v-model="removeTabs" @click="refreshTabs = false">
                remove tabs
            </label>
        </div>
        <br>
        <button type="submit" class="btn btn-success" v-on:click="saveSettings">Save</button>
        <button type="submit" class="btn btn-danger" v-on:click="removeHistory">Remove History</button>
        <notification ref="notification"></notification>
    </div>

</template>

<script>
  import Notification from './Notification.vue';
  import {remove} from './../js/remove';
  export default {
    components: {
      Notification
    },
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
          localStorage: this.localStorage,
          pluginData: this.pluginData,
          passwords: this.passwords,
          webSQL: this.webSQL,
        };
        chrome.storage.sync.set({"options": options}, () => {
          this.$refs.notification.showSuccessNotification("Saved!");
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
        this.$refs.notification.showInfoNotification("History Removed!");
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

    a:hover {
        text-underline: none;
    }
</style>