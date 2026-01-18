# One-Click History Cleaner

[![Check Build](https://github.com/firsttris/oneclickhistorycleaner/actions/workflows/check_build.yml/badge.svg)](https://github.com/firsttris/oneclickhistorycleaner/actions/workflows/check_build.yml)
[![GitHub release](https://img.shields.io/github/v/release/firsttris/oneclickhistorycleaner)](https://github.com/firsttris/oneclickhistorycleaner/releases)
[![License](https://img.shields.io/github/license/firsttris/oneclickhistorycleaner)](LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/kcjbahochamceejpgjkniopafgdhkplb)](https://chrome.google.com/webstore/detail/removereload/kcjbahochamceejpgjkniopafgdhkplb)

## Overview

Experience the simplicity of cleaning your browsing history with just a single click. Our One-Click History Cleaner is designed to provide a seamless and efficient browsing experience.

## Why Choose Us?

While there are numerous history cleaners available, none offer the simplicity and efficiency of a one-click operation. 

## Trust and Transparency

We prioritize your safety. Unlike many Chrome addons, our code is open source and available for review on GitHub. We believe in transparency and ensure that your data is not spied on or misused.

## Key Features

* Swift removal of browser data.
* Customizable cleaning options. Choose what you want to remove:
  - **Appcache**: Application cache
  - **Cache**: The browser cache that stores images and other resources downloaded by websites
  - **Cookies**: Cookies set by websites
  - **Downloads**: Download history
  - **FileSystems**: File systems created by web applications
  - **FormData**: Form data, such as usernames and passwords
  - **History**: Browser history
  - **IndexedDB**: Data in an IndexedDB database
  - **ServerBoundCertificates**: Server-bound certificates
  - **LocalStorage**: Data in local storage
  - **PluginData**: Data stored by plugins
  - **Passwords**: Stored passwords
  - **WebSQL**: Data in a Web SQL database
  - **ServiceWorkers**: Service Worker cache
* Refresh or remove all tabs after cleaning for a fresh browsing start.

Experience a cleaner and safer browsing experience with our One-Click History Cleaner.

## Install
[Go to Chrome Webstore](https://chrome.google.com/webstore/detail/removereload/kcjbahochamceejpgjkniopafgdhkplb)

## Development

1. Clone the repository
1. Install dependencies: `npm install`
1. Run development server: `npm run start`
1. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    1. Check `Developer mode`
    1. Click on `Load unpacked extension`
    1. Select the `dist` folder

### Build for Production

Run `npm run build` to create a production build in the `dist` folder.

## License
See the [LICENSE](LICENSE) file for license rights and limitations.
