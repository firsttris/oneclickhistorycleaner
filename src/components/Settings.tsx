/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSignal, onMount, For } from "solid-js";
import {
  clearHistory,
  createNotification,
  defaultOptions,
} from "../clearHistory";
import { t } from "../i18n/utils";

export const Settings = () => {
  const [options, setOptions] = createSignal(defaultOptions);
  const [removeTabs, setRemoveTabs] = createSignal(false);

  onMount(async () => {
    const optionsResult = await chrome.storage.sync.get(["options"]);
    const tabsResult = await chrome.storage.sync.get(["tabs"]);

    if (optionsResult?.options) {
      setOptions({ ...options(), ...optionsResult?.options });
    }

    if (tabsResult?.tabs) {
      setRemoveTabs(tabsResult.tabs.removeTabs);
    }
  });

  const saveSettings = async () => {
    await chrome.storage.sync.set({
      options: options(),
      tabs: {
        removeTabs: removeTabs(),
      },
    });
    await createNotification(t("notification_saved"));

    setTimeout(async () => {
      await chrome.notifications.clear("RRNotification");
    }, 1000);
  };

  return (
    <div class="min-h-screen flex items-center justify-center p-6">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 space-y-8">
        {/* Header */}
        <div class="text-center space-y-2">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">
            One Click History Cleaner
          </h1>
          <p class="text-gray-500">
            {t("whatShouldBeRemoved")}
          </p>
        </div>

        {/* Options Grid */}
        <div class="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-3">
          <For each={Object.entries(options())}>
            {([key, value]) => (
              <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 border-2 border-transparent hover:border-primary-200 group">
                <div class="relative flex items-center">
                  <input
                    id={key}
                    checked={value}
                    type="checkbox"
                    class="peer sr-only"
                    onChange={() => {
                      setOptions({ ...options(), [key]: !value });
                      saveSettings();
                    }}
                  />
                  <div class="w-6 h-6 border-2 border-gray-300 rounded-md peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all duration-200 flex items-center justify-center">
                    <svg class="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span class="ml-3 text-gray-700 font-medium group-hover:text-gray-900">
                  {t(key as any)}
                </span>
              </label>
            )}
          </For>
        </div>

        {/* Tab Options */}
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <div class="h-px flex-1 bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
            <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              {t("removeOrReload")}
            </span>
            <div class="h-px flex-1 bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <label class="relative flex items-center p-4 bg-linear-to-br from-green-50 to-green-100 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 border-2 border-transparent hover:border-green-300">
              <input
                id="refresh"
                checked={!removeTabs()}
                type="checkbox"
                class="peer sr-only"
                onChange={() => {
                  setRemoveTabs(!removeTabs());
                  saveSettings();
                }}
              />
              <div class="w-6 h-6 border-2 border-green-400 rounded-md peer-checked:bg-green-500 peer-checked:border-green-500 transition-all duration-200 flex items-center justify-center">
                <svg class="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="ml-3 text-green-800 font-semibold">
                {t("refresh")}
              </span>
            </label>

            <label class="relative flex items-center p-4 bg-linear-to-br from-red-50 to-red-100 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 border-2 border-transparent hover:border-red-300">
              <input
                id="remove"
                checked={removeTabs()}
                type="checkbox"
                class="peer sr-only"
                onChange={() => {
                  setRemoveTabs(!removeTabs());
                  saveSettings();
                }}
              />
              <div class="w-6 h-6 border-2 border-red-400 rounded-md peer-checked:bg-red-500 peer-checked:border-red-500 transition-all duration-200 flex items-center justify-center">
                <svg class="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="ml-3 text-red-800 font-semibold">
                {t("remove")}
              </span>
            </label>
          </div>
        </div>

        {/* Clean History Button */}
        <button
          type="button"
          onClick={clearHistory}
          class="w-full bg-linear-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 text-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{t("cleanHistory")}</span>
        </button>
      </div>
    </div>
  );
};
