import { createSignal, onMount } from "solid-js";
import { createNotification, defaultOptions, type TabOptions } from "../clearHistory";
import { t } from "../i18n/utils";
import { DataOptions } from "./DataOptions";
import { TabBehavior } from "./TabBehavior";
import { CleanButton } from "./CleanButton";
import { InfoFooter } from "./InfoFooter";

export const Settings = () => {
  const [options, setOptions] = createSignal(defaultOptions);
  const [refreshMode, setRefreshMode] = createSignal<"refresh_current" | "refresh_all" | "refresh_all_except_current">("refresh_current");

  onMount(async () => {
    try {
      const result = await chrome.storage.sync.get(["options", "tabs"]);
      
      if (result.options) {
        setOptions(result.options);
      }

      const tabs = result.tabs as TabOptions | undefined;
      if (tabs?.refreshMode) {
        setRefreshMode(tabs.refreshMode);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  });

  const saveSettings = async () => {
    try {
      await chrome.storage.sync.set({
        options: options(),
        tabs: {
          refreshMode: refreshMode(),
        },
      });
      await createNotification(t("notification_saved"));

      setTimeout(async () => {
        await chrome.notifications.clear("RRNotification");
      }, 1000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <div class="min-h-screen flex items-start justify-center p-3 md:p-4">
      <div class="bg-white border border-gray-200 rounded-md shadow-sm max-w-2xl w-full">
        <div class="p-4 md:p-5">
          <DataOptions 
            options={options} 
            setOptions={setOptions} 
            onSave={saveSettings} 
          />
          <TabBehavior 
            refreshMode={refreshMode} 
            setRefreshMode={setRefreshMode} 
            onSave={saveSettings} 
          />
          <CleanButton />
          <InfoFooter />
        </div>
      </div>
    </div>
  );
};
