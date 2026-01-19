import { createSignal, onMount } from "solid-js";
import { createNotification, defaultOptions, type TabOptions } from "../clearHistory";
import { t } from "../i18n/utils";
import { Header } from "./Header";
import { DataOptions } from "./DataOptions";
import { TabBehavior } from "./TabBehavior";
import { CleanButton } from "./CleanButton";
import { InfoFooter } from "./InfoFooter";

export const Settings = () => {
  const [options, setOptions] = createSignal(defaultOptions);
  const [removeTabs, setRemoveTabs] = createSignal(false);

  onMount(async () => {
    try {
      const result = await chrome.storage.sync.get(["options", "tabs"]);
      
      if (result.options) {
        setOptions(result.options);
      }

      const tabs = result.tabs as TabOptions | undefined;
      if (tabs?.removeTabs !== undefined) {
        setRemoveTabs(tabs.removeTabs);
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
          removeTabs: removeTabs(),
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
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden">
        <div class="p-6">
          <DataOptions 
            options={options} 
            setOptions={setOptions} 
            onSave={saveSettings} 
          />
          <TabBehavior 
            removeTabs={removeTabs} 
            setRemoveTabs={setRemoveTabs} 
            onSave={saveSettings} 
          />
          <CleanButton />
          <InfoFooter />
        </div>
      </div>
    </div>
  );
};
