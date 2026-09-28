import { type Accessor, For, type Setter } from 'solid-js';
import { REFRESH_MODES, type RefreshMode } from '../clearHistory';
import { t } from '../i18n/utils';
import { optionCardClass, sectionTitleClass } from './styles';

interface TabBehaviorProps {
  refreshMode: Accessor<RefreshMode>;
  setRefreshMode: Setter<RefreshMode>;
  onSave: () => Promise<void>;
}

const LABELS: Record<RefreshMode, { title: string; description: string }> = {
  refresh_current: { title: 'refreshOnlyCurrentTab', description: 'refreshOnlyCurrentTabDescription' },
  refresh_all_except_current: {
    title: 'refreshAllExceptCurrentTab',
    description: 'refreshAllExceptCurrentTabDescription',
  },
  refresh_all: { title: 'refreshAllTabs', description: 'refreshAllTabsDescription' },
  remove_all_tabs: { title: 'removeAllTabs', description: 'removeAllTabsDescription' },
};

export const TabBehavior = (props: TabBehaviorProps) => {
  return (
    <fieldset class="border-t border-gray-200 pt-5 dark:border-gray-800">
      <legend class={`${sectionTitleClass} float-left mb-2.5 w-full`}>{t('tabBehavior')}</legend>
      <div class="clear-both space-y-1.5">
        <For each={REFRESH_MODES}>
          {(mode) => (
            <label class={optionCardClass}>
              <input
                type="radio"
                name="refreshMode"
                value={mode}
                checked={props.refreshMode() === mode}
                onChange={() => {
                  props.setRefreshMode(mode);
                  void props.onSave();
                }}
                class="h-4 w-4 shrink-0 cursor-pointer accent-primary-600"
              />
              <span>
                <span class="block text-xs font-medium text-gray-900 dark:text-gray-100">{t(LABELS[mode].title)}</span>
                <span class="mt-0.5 block text-[11px] text-gray-600 dark:text-gray-400">
                  {t(LABELS[mode].description)}
                </span>
              </span>
            </label>
          )}
        </For>
      </div>
    </fieldset>
  );
};
