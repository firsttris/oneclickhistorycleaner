# removereload chrome

:wastebasket: RemoveReload is a **one-click** history remover extension for [Google Chrome](https://www.google.de/chrome/browser/desktop/) with  hot reload.   
Focused on web-development.

## Features

* clears browser data
* what will be deleted?
  - appcache
  - cache
  - cookies
  - downloads
  - fileSystems
  - formData
  - history
  - indexedDB
  - localStorage
  - pluginData
  - passwords
  - webSQL
* remove all tabs after cleaning
* refresh all tabs after cleaning

## Install

[Chrome Webstore Link](https://chrome.google.com/webstore/detail/removereload/kcjbahochamceejpgjkniopafgdhkplb)

## Stack
Chrome Extensions uses
- [Webpack](https://webpack.github.io/)
- [Buble](https://buble.surge.sh/)
- [VueJs](https://github.com/vuejs/vue)
- [Bootstraps](https://github.com/twbs/bootstrap)

## Development

1. Clone
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3. Run `yarn`.
4. Change the package's name and description on `package.json`.
5. Change the name of your extension on `src/manifest.json`.
6. Run `npm run start`
7. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
8. Have fun.

## Sources
I forked this boilerplate and added Buble, VueJs, Bootstraps   
[chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)  
Samuel Simões ~ [@samuelsimoes](https://twitter.com/samuelsimoes) ~ [Blog](http://blog.samuelsimoes.com/)