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
    const { options: storedOptions } = await chrome.storage.sync.get(["options"]);
    const { tabs: storedTabs } = await chrome.storage.sync.get(["tabs"]);

    if (storedOptions) {
      setOptions(storedOptions);
    }

    if (storedTabs?.removeTabs !== undefined) {
      setRemoveTabs(storedTabs.removeTabs);
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
    <div class="min-h-screen flex items-center justify-center p-4 md:p-8 py-12">
      <div class="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden">
        {/* Gradient Header */}
        <div class="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 px-8 md:px-12 pt-12 pb-10">
          <div class="flex items-center justify-center mb-6">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
          <h1 class="text-4xl md:text-4xl font-bold text-white text-center">
            One Click History Cleaner
          </h1>
          <p class="text-white/90 text-center mt-3 text-lg font-light">
            {t("whatShouldBeRemoved")}
          </p>
        </div>

        {/* Main Content */}
        <div class="p-8 md:p-12">
          {/* Options Section */}
          <div class="space-y-4 mb-10">
            <h2 class="text-sm font-bold text-gray-600 uppercase tracking-wider mb-6 flex items-center">
              <div class="w-1 h-6 bg-primary-500 rounded-full mr-3"></div>
              Clear Data Options
            </h2>
            <For each={Object.entries(options())}>
              {([key, value]) => (
                <label class="group flex items-center p-4 bg-gradient-to-br from-gray-50 to-gray-50 hover:from-primary-50 hover:to-primary-50 rounded-lg cursor-pointer border-2 border-transparent hover:border-primary-200 transition-all duration-200">
                  <div class="relative flex items-center flex-shrink-0">
                    <input
                      id={key}
                      checked={value}
                      type="checkbox"
                      class="sr-only peer"
                      onChange={() => {
                        setOptions({ ...options(), [key]: !value });
                        saveSettings();
                      }}
                    />
                    <div class="w-6 h-6 border-2 border-gray-400 peer-checked:border-primary-600 rounded-sm transition-all duration-200"></div>
                    <svg class="absolute inset-0 m-auto w-5 h-5 text-primary-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-700 text-sm font-normal group-hover:text-gray-900 transition-colors">
                    {t(key)}
                  </span>
                </label>
              )}
            </For>
          </div>

          {/* Tab Options */}
          <div class="space-y-6 border-t border-gray-200 pt-10">
            <h2 class="text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center">
              <div class="w-1 h-6 bg-primary-500 rounded-full mr-3"></div>
              Tab Behavior
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="group relative flex flex-col p-6 bg-gradient-to-br from-emerald-50 to-emerald-50 hover:from-emerald-100 hover:to-emerald-50 rounded-xl cursor-pointer border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-200">
                <div class="flex items-start">
                  <div class="relative flex items-center flex-shrink-0">
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
                    <div class="w-6 h-6 border-2 border-gray-400 peer-checked:border-emerald-600 rounded-sm transition-all duration-200"></div>
                    <svg class="absolute inset-0 m-auto w-5 h-5 text-emerald-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-emerald-900 font-medium text-base flex items-center">
                      <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {t("refresh")}
                    </div>
                    <p class="text-emerald-700 text-xs mt-2 font-normal">Reload the page after cleaning</p>
                  </div>
                </div>
              </label>

              <label class="group relative flex flex-col p-6 bg-gradient-to-br from-red-50 to-red-50 hover:from-red-100 hover:to-red-50 rounded-xl cursor-pointer border-2 border-red-200 hover:border-red-400 transition-all duration-200">
                <div class="flex items-start">
                  <div class="relative flex items-center flex-shrink-0">
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
                    <div class="w-6 h-6 border-2 border-gray-400 peer-checked:border-red-600 rounded-sm transition-all duration-200"></div>
                    <svg class="absolute inset-0 m-auto w-5 h-5 text-red-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <div class="text-red-900 font-medium text-base flex items-center">
                      <svg class="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t("remove")}
                    </div>
                    <p class="text-red-700 text-xs mt-2 font-normal">Close tabs after cleaning</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Clean History Button */}
          <button
            type="button"
            onClick={clearHistory}
            class="w-full mt-10 bg-linear-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center space-x-3 text-lg group"
          >
            <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("cleanHistory")}</span>
          </button>

          {/* Footer Info */}
          <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <p class="text-blue-800 text-sm">Settings are automatically saved when you make changes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
