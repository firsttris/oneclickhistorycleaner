import { type Accessor, For, type Setter } from 'solid-js';
import { supportedDataTypes } from '../clearHistory';
import { t } from '../i18n/utils';
import { optionCardClass, sectionTitleClass } from './styles';

interface DataOptionsProps {
  options: Accessor<chrome.browsingData.DataTypeSet>;
  setOptions: Setter<chrome.browsingData.DataTypeSet>;
  onSave: () => Promise<void>;
}

export const DataOptions = (props: DataOptionsProps) => {
  const allSelected = () => supportedDataTypes.every((key) => props.options()[key]);

  const update = (changes: chrome.browsingData.DataTypeSet) => {
    props.setOptions({ ...props.options(), ...changes });
    void props.onSave();
  };

  const toggleAll = () => {
    const value = !allSelected();
    update(Object.fromEntries(supportedDataTypes.map((key) => [key, value])));
  };

  return (
    <section>
      <div class="mb-2.5 flex items-center justify-between">
        <h2 class={sectionTitleClass}>{t('clearDataOptions')}</h2>
        <button
          type="button"
          onClick={toggleAll}
          class="rounded-sm px-1.5 py-0.5 text-[11px] font-medium text-primary-600 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-primary-500 dark:text-primary-400 dark:hover:bg-gray-800"
        >
          {allSelected() ? t('deselectAll') : t('selectAll')}
        </button>
      </div>
      <div class="grid gap-1.5 sm:grid-cols-2">
        <For each={supportedDataTypes}>
          {(key) => (
            <label class={optionCardClass}>
              <input
                type="checkbox"
                checked={!!props.options()[key]}
                onChange={(event) => update({ [key]: event.currentTarget.checked })}
                class="h-4 w-4 shrink-0 cursor-pointer accent-primary-600"
              />
              <span class="text-xs text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
                {t(key)}
              </span>
            </label>
          )}
        </For>
      </div>
    </section>
  );
};
