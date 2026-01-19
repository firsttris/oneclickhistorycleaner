<div align="center">

# One-Click History Cleaner

### 🚀 Clean your browsing history with a single click
**Simple, fast, and transparent browser extension**

<img src="public/banner/1280x800.png" alt="One-Click History Cleaner Banner" width="800">

[![Check Build](https://img.shields.io/github/actions/workflow/status/firsttris/oneclickhistorycleaner/check_build.yml?branch=master&label=Build&logo=github&style=flat-square)](https://github.com/firsttris/oneclickhistorycleaner/actions/workflows/check_build.yml)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/kcjbahochamceejpgjkniopafgdhkplb?label=Chrome&logo=google-chrome&style=flat-square)](https://chrome.google.com/webstore/detail/removereload/kcjbahochamceejpgjkniopafgdhkplb)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/kcjbahochamceejpgjkniopafgdhkplb?label=Users&style=flat-square)](https://chrome.google.com/webstore/detail/removereload/kcjbahochamceejpgjkniopafgdhkplb)
[![License](https://img.shields.io/github/license/firsttris/oneclickhistorycleaner?style=flat-square)](LICENSE)

[Installation](#-installation) •
[Features](#-features) •
[Development](#-development) •
[Contributing](#-contributing)

</div>

---

## ✨ Features

- 🚀 **One-Click Operation** - Remove your browsing data instantly
- ⚙️ **Fully Customizable** - Choose exactly what to clean
- 🔄 **Auto-Refresh** - Optionally refresh or close all tabs after cleaning
- 🔒 **Privacy-Focused** - No data collection, fully open source
- 🎨 **Modern UI** - Built with Solid.js and Tailwind CSS

## 📦 Installation

<div align="center">

### Chrome Web Store
[![Available in the Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore/detail/removereload/kcjbahochamceejpgjkniopafgdhkplb)

### Microsoft Edge Add-ons
[![Compatible with Edge](https://img.shields.io/badge/Microsoft%20Edge-Compatible-0078D4?style=for-the-badge&logo=microsoftedge&logoColor=white)](https://chrome.google.com/webstore/detail/removereload/kcjbahochamceejpgjkniopafgdhkplb)

</div>

## 🧹 What Can Be Cleaned?

Configure which types of data to remove:

| Data Type | Description |
|-----------|-------------|
| **Appcache** | Application cache |
| **Cache** | Browser cache (images, resources, etc.) |
| **Cookies** | Cookies set by websites |
| **Downloads** | Download history |
| **FileSystems** | File systems created by web applications |
| **FormData** | Saved form data (usernames, passwords) |
| **History** | Browsing history |
| **IndexedDB** | IndexedDB database data |
| **LocalStorage** | Local storage data |
| **PluginData** | Data stored by plugins |
| **Passwords** | Stored passwords |
| **ServiceWorkers** | Service Worker cache |
| **WebSQL** | Web SQL database data |

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="150">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="150">
<img src="https://www.solidjs.com/img/logo/without-wordmark/logo.svg" width="48" height="48" alt="Solid.js" />
<br>Solid.js
</td>
<td align="center" width="150">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="48" height="48" alt="Vite" />
<br>Vite
</td>
<td align="center" width="150">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind CSS" />
<br>Tailwind CSS
</td>
</tr>
</table>

## 💻 Development

### Prerequisites

- Node.js 20 or higher
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/firsttris/oneclickhistorycleaner.git
cd oneclickhistorycleaner

# Install dependencies
npm install

# Start development server
npm run start
```

### Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `dist` folder from the project

The extension will hot-reload as you make changes.

### Available Scripts

```bash
npm run start      # Start development server with hot reload
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Check code with Biome
npm run lint:fix   # Fix linting issues
npm run format     # Format code with Biome
```

## 📤 Publishing

### Chrome Web Store

GitHub Actions workflow automates publishing to Chrome Web Store.

**Setup:**

1. Generate API credentials following [chrome-webstore-upload-keys](https://github.com/fregante/chrome-webstore-upload-keys)
2. Run `npx chrome-webstore-upload-keys` to get your `REFRESH_TOKEN`
3. Add these secrets to your GitHub repository:
   - `CHROME_EXTENSION_ID`
   - `CHROME_CLIENT_ID`
   - `CHROME_CLIENT_SECRET`
   - `CHROME_REFRESH_TOKEN`

**Deploy:**
```bash
# Trigger via GitHub Actions workflow
gh workflow run submit_chrome_webstore.yml
```

### Microsoft Edge Add-ons

GitHub Actions workflow automates publishing to Edge Add-ons store.

**Setup:**

1. Go to [Microsoft Partner Center - Publish API](https://partner.microsoft.com/dashboard/microsoftedge/publishapi)
2. Generate API credentials
3. Add these secrets to your GitHub repository:
   - `EDGE_PRODUCT_ID`
   - `EDGE_CLIENT_ID`
   - `EDGE_API_KEY`

**Deploy:**
```bash
# Trigger via GitHub Actions workflow
gh workflow run submit_edge_store.yml
```

## 🔐 Privacy & Security

- **100% Open Source** - All code is available for review
- **No Tracking** - We don't collect any data
- **Local Processing** - Everything runs on your device
- **Transparent Permissions** - Only uses necessary browser APIs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

<div align="center">

---

Made with ❤️ by the open-source community

[![GitHub Stars](https://img.shields.io/github/stars/firsttris/oneclickhistorycleaner?style=social)](https://github.com/firsttris/oneclickhistorycleaner)
[![GitHub Forks](https://img.shields.io/github/forks/firsttris/oneclickhistorycleaner?style=social)](https://github.com/firsttris/oneclickhistorycleaner/fork)

</div>

## 📄 License
See the [LICENSE](LICENSE) file for license rights and limitations.
