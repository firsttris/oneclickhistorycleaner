import { t } from "../i18n/utils";

export const Header = () => {
  return (
    <div class="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 px-8 md:px-12 pt-12 pb-10">
      <div class="flex items-center justify-center mb-6">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      </div>
      <h1 class="text-4xl md:text-4xl font-bold text-white text-center">
        One Click History Cleaner
      </h1>
      <p class="text-white/90 text-center mt-3 text-lg font-light">
        {t("whatShouldBeRemoved")}
      </p>
    </div>
  );
};
