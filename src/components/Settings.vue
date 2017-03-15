<template>
    <div class="fields container">
        <h3><a href="https://developer.chrome.com/extensions/browsingData" target="_blank">chrome.browsingData.remove()</a></h3>
        <p>remove browsingData</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="appcache" value="appcache" v-model="options.appcache"> appcache
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="cache" value="cache" v-model="options.cache"> cache
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="cookies" value="cookies" v-model="options.cookies"> cookies
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="downloads" value="downloads" v-model="options.downloads"> downloads
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="fileSystems" value="fileSystems" v-model="options.fileSystems"> fileSystems
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="formData" value="formData" v-model="options.formData"> formData
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="history" value="history" v-model="options.history"> history
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="indexedDB" value="indexedDB" v-model="options.indexedDB"> indexedDB
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="localStorage" value="localStorage" v-model="options.localStorage"> localStorage
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="pluginData" value="pluginData" v-model="options.pluginData"> pluginData
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="passwords" value="passwords" v-model="options.passwords"> passwords
            </label>
        </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="webSQL" value="webSQL" v-model="options.webSQL"> webSQL
            </label>
        </div>
        <br>
        <h3><a href="https://developer.chrome.com/extensions/tabs#method-reload" target="_blank">chrome.tabs.reload()</a></h3>
        <p>reload tabs after removing browsingData</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="refresh" value="refresh" v-model="options.refresh"> refresh tabs
            </label>
        </div>
        <br>
        <h3><a href="https://developer.chrome.com/extensions/tabs#method-remove" target="_blank">chrome.tabs.remove()</a></h3>
        <p>remove tabs after removing browsingData</p>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" id="remove" value="remove" v-model="options.remove"> remove tabs
            </label>
        </div>
        <br>
        <button type="submit" class="btn btn-secondary" v-on:click="saveSettings">Save</button>
    </div>

</template>

<script>
  export default {
    data () {
      return {
        options: {
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
          refresh: true,
          remove: true
        }
      };
    },
    methods: {
      saveSettings: function () {
        chrome.storage.sync.set({ "options": this.options }, () => {
        });
      }
    },
    created: function () {
      chrome.storage.sync.get(["options"], (result) => {
        if(result.options) {
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
          this.refresh = result.options.refresh;
          this.remove = result.options.remove;
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