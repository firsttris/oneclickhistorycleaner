/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Target browser of the build, set in vite.config.ts */
  readonly BROWSER: 'chrome' | 'firefox';
}
