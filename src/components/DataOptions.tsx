import { For, type Accessor, type Setter } from "solid-js";
import { t } from "../i18n/utils";

interface DataOptionsProps {
  options: Accessor<chrome.browsingData.DataTypeSet>;
  setOptions: Setter<chrome.browsingData.DataTypeSet>;
  onSave: () => Promise<void>;
}

export const DataOptions = (props: DataOptionsProps) => {
  return (
    <div class="space-y-1.5 mb-5">
      <h2 class="text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-2.5">
        {t("clearDataOptions")}
      </h2>
      <For each={Object.entries(props.options())}>
        {([key, value]) => (
          <label class="group flex items-center p-2 rounded-sm cursor-pointer border border-gray-200 bg-white hover:bg-gray-50">
            <div class="relative flex items-center shrink-0">
              <input
                id={key}
                checked={value}
                type="checkbox"
                class="sr-only peer"
                onChange={() => {
                  props.setOptions({ ...props.options(), [key]: !value });
                  props.onSave();
                }}
              />
              <div class="w-4 h-4 border-2 border-gray-400 peer-checked:border-primary-600 rounded-[3px]"></div>
              <svg class="absolute inset-0 m-auto w-3.5 h-3.5 text-primary-600 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <span class="ml-2 text-gray-700 text-xs font-normal group-hover:text-gray-900">
              {t(key)}
            </span>
          </label>
        )}
      </For>
    </div>
  );
};
