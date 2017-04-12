# removereload chrome

Remove&Reload is a **one-click** history remover extension for [Google Chrome](https://www.google.de/chrome/browser/desktop/) with  hot reload.   
Focused on web-development.

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
- [Buble](https://buble.surge.sh/)
- [VueJs](https://github.com/vuejs/vue)
- [Bootstraps](https://github.com/twbs/bootstrap)

#### Sources
I forked this boilerplate from [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
