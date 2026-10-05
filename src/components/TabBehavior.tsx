import { type Accessor, For, type Setter, Show } from 'solid-js';
import { REFRESH_MODES, type RefreshMode } from '../clearHistory';
import { t } from '../i18n/utils';
import { Badge } from './ui/badge';
import { TriangleAlertIcon } from './ui/icons';

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

const isDestructive = (mode: RefreshMode) => mode === 'remove_all_tabs';

export const TabBehavior = (props: TabBehaviorProps) => {
  return (
    <fieldset>
      <legend class="contents">
        <span class="block text-sm font-medium">{t('tabBehavior')}</span>
      </legend>
      <p class="mb-2.5 text-xs text-muted-foreground">{t('tabBehaviorDescription')}</p>
      <div class="grid gap-2 sm:grid-cols-2">
        <For each={REFRESH_MODES}>
          {(mode) => (
            <label
              class="flex min-w-0 cursor-pointer items-start gap-2.5 rounded-lg border p-3 transition-colors hover:bg-accent/60 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
              classList={{
                'has-checked:border-primary has-checked:ring-1 has-checked:ring-primary': !isDestructive(mode),
                'has-checked:border-destructive has-checked:ring-1 has-checked:ring-destructive': isDestructive(mode),
              }}
            >
              <input
                type="radio"
                name="refreshMode"
                value={mode}
                checked={props.refreshMode() === mode}
                onChange={() => {
                  props.setRefreshMode(mode);
                  void props.onSave();
                }}
                class="mt-px grid size-4 shrink-0 cursor-pointer appearance-none place-content-center rounded-full border border-input bg-background shadow-xs outline-none checked:after:size-2 checked:after:rounded-full checked:after:content-[''] dark:bg-input/30"
                classList={{
                  'checked:border-primary checked:after:bg-primary': !isDestructive(mode),
                  'checked:border-destructive checked:after:bg-destructive': isDestructive(mode),
                }}
              />
              <span class="min-w-0">
                <span class="flex flex-wrap items-center gap-1.5 text-[13px] leading-tight font-medium">
                  {t(LABELS[mode].title)}
                  <Show when={isDestructive(mode)}>
                    <Badge variant="destructive">
                      <TriangleAlertIcon />
                      {t('destructive')}
                    </Badge>
                  </Show>
                </span>
                <span class="mt-0.5 block text-xs leading-snug text-muted-foreground">
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
