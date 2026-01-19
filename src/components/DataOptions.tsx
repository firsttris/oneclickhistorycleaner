import { For, type Accessor, type Setter } from "solid-js";
import { t } from "../i18n/utils";

interface DataOptionsProps {
  options: Accessor<chrome.browsingData.DataTypeSet>;
  setOptions: Setter<chrome.browsingData.DataTypeSet>;
  onSave: () => Promise<void>;
}

export const DataOptions = (props: DataOptionsProps) => {
  return (
    <div class="space-y-2 mb-6">
      <h2 class="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center">
        <div class="w-1 h-5 bg-primary-500 rounded-full mr-2"></div>
        {t("clearDataOptions")}
      </h2>
      <For each={Object.entries(props.options())}>
        {([key, value]) => (
          <label class="group flex items-center p-2 bg-linear-to-br from-gray-50 to-gray-50 hover:from-primary-50 hover:to-primary-50 rounded-lg cursor-pointer border-2 border-transparent hover:border-primary-200 transition-all duration-200">
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
              <div class="w-6 h-6 border-2 border-gray-400 peer-checked:border-primary-600 rounded-sm transition-all duration-200"></div>
              <svg class="absolute inset-0 m-auto w-5 h-5 text-primary-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <span class="ml-2 text-gray-700 text-sm font-normal group-hover:text-gray-900 transition-colors">
              {t(key)}
            </span>
          </label>
        )}
      </For>
    </div>
  );
};
