import { t } from "../i18n/utils";

export const InfoFooter = () => {
  return (
    <div class="mt-4 p-2 border border-gray-200 rounded-sm bg-gray-50">
      <div class="flex items-start">
        <svg class="w-3.5 h-3.5 text-gray-500 mr-1.5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <p class="text-gray-600 text-[11px]">{t("autoSaveInfo")}</p>
      </div>
    </div>
  );
};
