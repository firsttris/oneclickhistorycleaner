import { createSignal, onCleanup, onMount, Show } from 'solid-js';
import {
  DEFAULT_REFRESH_MODE,
  defaultOptions,
  loadOptions,
  loadRefreshMode,
  type RefreshMode,
  supportedDataTypes,
} from '../clearHistory';
import { t } from '../i18n/utils';
import { CleanButton } from './CleanButton';
import { DataOptions } from './DataOptions';
import { TabBehavior } from './TabBehavior';

export const Settings = () => {
  const [options, setOptions] = createSignal(defaultOptions);
  const [refreshMode, setRefreshMode] = createSignal<RefreshMode>(DEFAULT_REFRESH_MODE);
  const [saved, setSaved] = createSignal(false);
  let savedTimeout: ReturnType<typeof setTimeout> | undefined;

  onMount(async () => {
    try {
      setOptions(await loadOptions());
      setRefreshMode(await loadRefreshMode());
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  });

  onCleanup(() => clearTimeout(savedTimeout));

  const saveSettings = async () => {
    try {
      await chrome.storage.sync.set({
        options: options(),
        tabs: { refreshMode: refreshMode() },
      });
      setSaved(true);
      clearTimeout(savedTimeout);
      savedTimeout = setTimeout(() => setSaved(false), 1500);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const hasSelection = () => supportedDataTypes.some((key) => options()[key]);

  return (
    <main class="mx-auto max-w-2xl p-3 md:p-4">
      <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <header class="flex items-center gap-3 border-b border-gray-200 px-4 py-3 md:px-5 dark:border-gray-800">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-600 text-white">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <h1 class="text-sm font-bold text-gray-900 dark:text-white">One Click History Cleaner</h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">{t('whatShouldBeRemoved')}</p>
          </div>
          <span
            role="status"
            class="flex items-center gap-1 text-[11px] font-medium text-green-600 transition-opacity duration-300 dark:text-green-400"
            classList={{ 'opacity-0': !saved() }}
          >
            <Show when={saved()}>
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              {t('notification_saved')}
            </Show>
          </span>
        </header>

        <div class="space-y-5 p-4 md:p-5">
          <DataOptions options={options} setOptions={setOptions} onSave={saveSettings} />
          <TabBehavior refreshMode={refreshMode} setRefreshMode={setRefreshMode} onSave={saveSettings} />
          <CleanButton disabled={!hasSelection()} />
          <p class="text-center text-[11px] text-gray-500 dark:text-gray-400">
            {hasSelection() ? t('autoSaveInfo') : t('nothingSelected')}
          </p>
        </div>
      </div>
    </main>
  );
};
