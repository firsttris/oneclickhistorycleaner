import { type Accessor, For, type JSX, type Setter, Show } from 'solid-js';
import { supportedDataTypes } from '../clearHistory';
import { t } from '../i18n/utils';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { CookieIcon, DatabaseIcon, HistoryIcon } from './ui/icons';

type DataType = keyof chrome.browsingData.DataTypeSet;

interface DataOptionsProps {
  options: Accessor<chrome.browsingData.DataTypeSet>;
  setOptions: Setter<chrome.browsingData.DataTypeSet>;
  onSave: () => Promise<void>;
}

type Group = { title: string; icon: () => JSX.Element; keys: DataType[] };

const GROUPS: Group[] = (
  [
    {
      title: 'group_history',
      icon: () => <HistoryIcon class="size-3.5" />,
      keys: ['history', 'downloads', 'formData'],
    },
    {
      title: 'group_siteData',
      icon: () => <CookieIcon class="size-3.5" />,
      keys: ['cookies', 'localStorage', 'indexedDB', 'fileSystems'],
    },
    {
      title: 'group_cache',
      icon: () => <DatabaseIcon class="size-3.5" />,
      keys: ['cache', 'cacheStorage', 'serviceWorkers'],
    },
  ] satisfies Group[]
).map((group) => ({ ...group, keys: group.keys.filter((key) => supportedDataTypes.includes(key)) }));

export const DataOptions = (props: DataOptionsProps) => {
  const selectedCount = (keys: DataType[]) => keys.filter((key) => props.options()[key]).length;
  const allSelected = () => selectedCount(supportedDataTypes) === supportedDataTypes.length;

  const update = (changes: chrome.browsingData.DataTypeSet) => {
    props.setOptions({ ...props.options(), ...changes });
    void props.onSave();
  };

  const setAll = (keys: DataType[], value: boolean) => update(Object.fromEntries(keys.map((key) => [key, value])));

  return (
    <section aria-labelledby="data-options-title">
      <div class="mb-2.5 flex items-center justify-between gap-3">
        <div>
          <h2 id="data-options-title" class="text-sm font-medium">
            {t('clearDataOptions')}
          </h2>
          <p class="text-xs text-muted-foreground tabular-nums">
            {t('selectedCount', [String(selectedCount(supportedDataTypes)), String(supportedDataTypes.length)])}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setAll(supportedDataTypes, !allSelected())}>
          {allSelected() ? t('deselectAll') : t('selectAll')}
        </Button>
      </div>

      <div class="divide-y overflow-hidden rounded-lg border">
        <For each={GROUPS}>
          {(group) => {
            const count = () => selectedCount(group.keys);
            return (
              <Show when={group.keys.length > 0}>
                <div>
                  <div class="flex items-center gap-2 bg-muted px-3 py-2 text-xs font-medium text-muted-foreground">
                    {group.icon()}
                    <span class="flex-1">{t(group.title)}</span>
                    <Checkbox
                      checked={count() === group.keys.length}
                      indeterminate={count() > 0 && count() < group.keys.length}
                      onChange={() => setAll(group.keys, count() !== group.keys.length)}
                      aria-label={t('toggleGroup', t(group.title))}
                    />
                  </div>
                  <div class="grid sm:grid-cols-2">
                    <For each={group.keys}>
                      {(key) => (
                        <label
                          for={`data-type-${key}`}
                          class="flex min-w-0 cursor-pointer items-start gap-2.5 px-3 py-2.5 transition-colors hover:bg-accent/60"
                        >
                          <Checkbox
                            id={`data-type-${key}`}
                            checked={!!props.options()[key]}
                            onChange={(event) => update({ [key]: event.currentTarget.checked })}
                          />
                          <span class="min-w-0">
                            <span class="block text-[13px] leading-tight font-medium">{t(`label_${key}`)}</span>
                            <span class="mt-0.5 block text-xs leading-snug text-muted-foreground">{t(key)}</span>
                          </span>
                        </label>
                      )}
                    </For>
                  </div>
                </div>
              </Show>
            );
          }}
        </For>
      </div>
    </section>
  );
};
