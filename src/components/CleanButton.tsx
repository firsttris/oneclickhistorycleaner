import { clearHistory } from "../clearHistory";
import { t } from "../i18n/utils";

export const CleanButton = () => {
  return (
    <button
      type="button"
      onClick={clearHistory}
      class="w-full mt-5 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-3 rounded-sm border border-primary-700 transition-colors duration-150 flex items-center justify-center space-x-1.5 text-xs"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{t("cleanHistory")}</span>
    </button>
  );
};
