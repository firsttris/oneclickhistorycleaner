import { type Accessor, type Setter } from "solid-js";
import { t } from "../i18n/utils";

interface TabBehaviorProps {
  removeTabs: Accessor<boolean>;
  setRemoveTabs: Setter<boolean>;
  onSave: () => Promise<void>;
}

export const TabBehavior = (props: TabBehaviorProps) => {
  return (
    <div class="space-y-3 border-t border-gray-200 pt-6">
      <h2 class="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
        <div class="w-1 h-5 bg-primary-500 rounded-full mr-2"></div>
        {t("tabBehavior")}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label class="group relative flex flex-col p-3 bg-linear-to-br from-emerald-50 to-emerald-50 hover:from-emerald-100 hover:to-emerald-50 rounded-lg cursor-pointer border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-200">
          <div class="flex items-center">
            <div class="relative flex items-center shrink-0">
              <input
                id="refresh"
                checked={!props.removeTabs()}
                type="checkbox"
                class="peer sr-only"
                onChange={() => {
                  props.setRemoveTabs(!props.removeTabs());
                  props.onSave();
                }}
              />
              <div class="w-6 h-6 border-2 border-gray-400 peer-checked:border-emerald-600 rounded-sm transition-all duration-200"></div>
              <svg class="absolute inset-0 m-auto w-5 h-5 text-emerald-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <div class="ml-2">
              <div class="text-emerald-900 font-medium text-sm flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t("refresh")}
              </div>
              <p class="text-emerald-700 text-xs mt-1 font-normal">{t("reloadDescription")}</p>
            </div>
          </div>
        </label>

        <label class="group relative flex flex-col p-3 bg-linear-to-br from-red-50 to-red-50 hover:from-red-100 hover:to-red-50 rounded-lg cursor-pointer border-2 border-red-200 hover:border-red-400 transition-all duration-200">
          <div class="flex items-center">
            <div class="relative flex items-center shrink-0">
              <input
                id="remove"
                checked={props.removeTabs()}
                type="checkbox"
                class="peer sr-only"
                onChange={() => {
                  props.setRemoveTabs(!props.removeTabs());
                  props.onSave();
                }}
              />
              <div class="w-6 h-6 border-2 border-gray-400 peer-checked:border-red-600 rounded-sm transition-all duration-200"></div>
              <svg class="absolute inset-0 m-auto w-5 h-5 text-red-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <div class="ml-2">
              <div class="text-red-900 font-medium text-sm flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t("remove")}
              </div>
              <p class="text-red-700 text-xs mt-1 font-normal">{t("removeDescription")}</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};
