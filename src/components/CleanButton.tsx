import { clearHistory } from "../clearHistory";
import { t } from "../i18n/utils";

export const CleanButton = () => {
  return (
    <button
      type="button"
      onClick={clearHistory}
      class="w-full mt-6 bg-linear-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center space-x-2 text-base group"
    >
      <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{t("cleanHistory")}</span>
    </button>
  );
};
