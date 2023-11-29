/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSignal, onMount, For } from "solid-js";
import { clearHistory, createNotification, defaultOptions } from "../clearHistory";
import { useTranslations } from "../i18n/utils";

export const Settings = () => {
  const [options, setOptions] = createSignal(defaultOptions);
  const [removeTabs, setRemoveTabs] = createSignal(false);
  const t = useTranslations();

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
      options: options(), tabs: {
        removeTabs: removeTabs()
      }
    });
    await createNotification(t('notification.saved'))
  
    setTimeout(async () => {
      await chrome.notifications.clear("RRNotification");
    }, 1000);
  };

  return (
    <div class="fields container-fluid my-2">
      <h4 class="text">{t('whatShouldBeRemoved')}</h4>
      <For each={Object.entries(options())}>
        {([key, value]) => (
          <div class="form-check">
            <label class="form-check-label">
              <input id={key} checked={value} class="form-check-input" type="checkbox" onChange={() => {
                setOptions({ ...options(), [key]: !value });
                saveSettings();
              }} />
              {t(key as any)}
            </label>
          </div>
        )}
      </For>
      <h4 class="text mt-2">{t('removeOrReload')}</h4>
      <div class="form-check">
        <label class="form-check-label">
          <input id="refresh" checked={!removeTabs()} class="form-check-input" type="checkbox"
            onChange={() => {
              setRemoveTabs(!removeTabs());
              saveSettings();
            }} />
          {t('refresh')}
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
          <input id="remove" checked={removeTabs()} class="form-check-input" type="checkbox"
            onChange={() => {
              setRemoveTabs(!removeTabs());
              saveSettings();
            }} />
          {t('remove')}
        </label>
      </div>
      <br />
      <button type="submit" class="btn btn-secondary" onClick={clearHistory}>
        {t('cleanHistory')}
      </button>
    </div>
  );
}