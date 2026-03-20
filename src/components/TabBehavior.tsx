import { type Accessor, type Setter } from "solid-js";
import { t } from "../i18n/utils";

interface TabBehaviorProps {
  refreshMode: Accessor<"refresh_current" | "refresh_all" | "refresh_all_except_current">;
  setRefreshMode: Setter<"refresh_current" | "refresh_all" | "refresh_all_except_current">;
  onSave: () => Promise<void>;
}

export const TabBehavior = (props: TabBehaviorProps) => {
  return (
    <div class="space-y-3 border-t border-gray-200 pt-6">
      <h2 class="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
        <div class="w-1 h-5 bg-primary-500 rounded-full mr-2"></div>
        {t("tabBehavior")}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label class="group relative flex flex-col p-3 bg-linear-to-br from-emerald-50 to-emerald-50 hover:from-emerald-100 hover:to-emerald-50 rounded-lg cursor-pointer border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-200">
          <div class="flex items-center">
            <div class="relative flex items-center shrink-0">
              <input
                id="refreshCurrent"
                checked={props.refreshMode() === "refresh_current"}
                type="radio"
                name="refreshMode"
                class="peer sr-only"
                onChange={() => {
                  props.setRefreshMode("refresh_current");
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
                {t("refreshOnlyCurrentTab")}
              </div>
              <p class="text-emerald-700 text-xs mt-1 font-normal">{t("refreshOnlyCurrentTabDescription")}</p>
            </div>
          </div>
        </label>

        <label class="group relative flex flex-col p-3 bg-linear-to-br from-sky-50 to-sky-50 hover:from-sky-100 hover:to-sky-50 rounded-lg cursor-pointer border-2 border-sky-200 hover:border-sky-400 transition-all duration-200">
          <div class="flex items-center">
            <div class="relative flex items-center shrink-0">
              <input
                id="refreshAllExceptCurrent"
                checked={props.refreshMode() === "refresh_all_except_current"}
                type="radio"
                name="refreshMode"
                class="peer sr-only"
                onChange={() => {
                  props.setRefreshMode("refresh_all_except_current");
                  props.onSave();
                }}
              />
              <div class="w-6 h-6 border-2 border-gray-400 peer-checked:border-sky-600 rounded-sm transition-all duration-200"></div>
              <svg class="absolute inset-0 m-auto w-5 h-5 text-sky-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <div class="ml-2">
              <div class="text-sky-900 font-medium text-sm flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M20 20v-5h-.581M9 9h6" />
                </svg>
                {t("refreshAllExceptCurrentTab")}
              </div>
              <p class="text-sky-700 text-xs mt-1 font-normal">{t("refreshAllExceptCurrentTabDescription")}</p>
            </div>
          </div>
        </label>

        <label class="group relative flex flex-col p-3 bg-linear-to-br from-amber-50 to-amber-50 hover:from-amber-100 hover:to-amber-50 rounded-lg cursor-pointer border-2 border-amber-200 hover:border-amber-400 transition-all duration-200">
          <div class="flex items-center">
            <div class="relative flex items-center shrink-0">
              <input
                id="refreshAll"
                checked={props.refreshMode() === "refresh_all"}
                type="radio"
                name="refreshMode"
                class="peer sr-only"
                onChange={() => {
                  props.setRefreshMode("refresh_all");
                  props.onSave();
                }}
              />
              <div class="w-6 h-6 border-2 border-gray-400 peer-checked:border-amber-600 rounded-sm transition-all duration-200"></div>
              <svg class="absolute inset-0 m-auto w-5 h-5 text-amber-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <div class="ml-2">
              <div class="text-amber-900 font-medium text-sm flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t("refreshAllTabs")}
              </div>
              <p class="text-amber-700 text-xs mt-1 font-normal">{t("refreshAllTabsDescription")}</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};
