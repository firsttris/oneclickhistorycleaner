import { type Accessor, type Setter } from "solid-js";
import { t } from "../i18n/utils";

interface TabBehaviorProps {
  refreshMode: Accessor<"refresh_current" | "refresh_all" | "refresh_all_except_current" | "remove_all_tabs">;
  setRefreshMode: Setter<"refresh_current" | "refresh_all" | "refresh_all_except_current" | "remove_all_tabs">;
  onSave: () => Promise<void>;
}

export const TabBehavior = (props: TabBehaviorProps) => {
  return (
    <div class="space-y-2.5 border-t border-gray-200 pt-5">
      <h2 class="text-[11px] font-semibold text-gray-700 uppercase tracking-wider">
        {t("tabBehavior")}
      </h2>
      
      <div class="space-y-1.5">
        <label class="group relative flex flex-col p-2 rounded-sm cursor-pointer border border-gray-200 bg-white hover:bg-gray-50">
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
              <div class="w-4 h-4 border-2 border-gray-400 peer-checked:border-primary-600 rounded-full"></div>
              <div class="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary-600 opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
            </div>
            <div class="ml-2">
              <div class="text-gray-900 font-medium text-xs">
                {t("refreshOnlyCurrentTab")}
              </div>
              <p class="text-gray-600 text-[11px] mt-0.5 font-normal">{t("refreshOnlyCurrentTabDescription")}</p>
            </div>
          </div>
        </label>

        <label class="group relative flex flex-col p-2 rounded-sm cursor-pointer border border-gray-200 bg-white hover:bg-gray-50">
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
              <div class="w-4 h-4 border-2 border-gray-400 peer-checked:border-primary-600 rounded-full"></div>
              <div class="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary-600 opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
            </div>
            <div class="ml-2">
              <div class="text-gray-900 font-medium text-xs">
                {t("refreshAllExceptCurrentTab")}
              </div>
              <p class="text-gray-600 text-[11px] mt-0.5 font-normal">{t("refreshAllExceptCurrentTabDescription")}</p>
            </div>
          </div>
        </label>

        <label class="group relative flex flex-col p-2 rounded-sm cursor-pointer border border-gray-200 bg-white hover:bg-gray-50">
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
              <div class="w-4 h-4 border-2 border-gray-400 peer-checked:border-primary-600 rounded-full"></div>
              <div class="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary-600 opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
            </div>
            <div class="ml-2">
              <div class="text-gray-900 font-medium text-xs">
                {t("refreshAllTabs")}
              </div>
              <p class="text-gray-600 text-[11px] mt-0.5 font-normal">{t("refreshAllTabsDescription")}</p>
            </div>
          </div>
        </label>

        <label class="group relative flex flex-col p-2 rounded-sm cursor-pointer border border-gray-200 bg-white hover:bg-gray-50">
          <div class="flex items-center">
            <div class="relative flex items-center shrink-0">
              <input
                id="removeAllTabs"
                checked={props.refreshMode() === "remove_all_tabs"}
                type="radio"
                name="refreshMode"
                class="peer sr-only"
                onChange={() => {
                  props.setRefreshMode("remove_all_tabs");
                  props.onSave();
                }}
              />
              <div class="w-4 h-4 border-2 border-gray-400 peer-checked:border-primary-600 rounded-full"></div>
              <div class="absolute inset-0 m-auto w-2 h-2 rounded-full bg-primary-600 opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
            </div>
            <div class="ml-2">
              <div class="text-gray-900 font-medium text-xs">
                {t("removeAllTabs")}
              </div>
              <p class="text-gray-600 text-[11px] mt-0.5 font-normal">{t("removeAllTabsDescription")}</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};
