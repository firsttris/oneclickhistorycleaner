# One Click History Cleaner

One Click History Cleaner with hot-reload.

## Motivation

There are many "History Cleaner" out there, but none of them is simple as just one click.

Safety, most Chrome addons have no open source code, or may spy your data. 
For this Addon you can check the implementation on Github.

## Features

* Removing browser data
* Select what should be removed:
  - Appcache
  - Cache
  - Cookies
  - Downloads
  - FileSystems
  - FormData
  - History
  - IndexedDB
  - ServerBoundCertificates
  - LocalStorage
  - PluginData
  - Passwords
  - WebSQL
  - ServiceWorkers
* Remove all tabs after cleaning
* Refresh all tabs after cleaning

## Install
[Go to Chrome Webstore](https://chrome.google.com/webstore/detail/removereload/kcjbahochamceejpgjkniopafgdhkplb)

## Development

1. Clone
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`
3. Run `yarn`
6. Run `npm run start`
7. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder

#### Chrome-Extension Stack
- [Webpack](https://webpack.github.io/)
- [VueJs](https://github.com/vuejs/vue)
- [Bootstraps](https://github.com/twbs/bootstrap)

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
