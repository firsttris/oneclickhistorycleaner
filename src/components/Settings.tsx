import { createSignal, onCleanup, onMount } from 'solid-js';
import {
  DEFAULT_REFRESH_MODE,
  defaultOptions,
  loadOptions,
  loadRefreshMode,
  type RefreshMode,
  supportedDataTypes,
} from '../clearHistory';
import { t } from '../i18n/utils';
import { CleanButton } from './CleanButton';
import { DataOptions } from './DataOptions';
import { TabBehavior } from './TabBehavior';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { CheckIcon, Trash2Icon } from './ui/icons';
import { Toaster } from './ui/toast';

export const Settings = () => {
  const [options, setOptions] = createSignal(defaultOptions);
  const [refreshMode, setRefreshMode] = createSignal<RefreshMode>(DEFAULT_REFRESH_MODE);
  const [saved, setSaved] = createSignal(false);
  let savedTimeout: ReturnType<typeof setTimeout> | undefined;

  onMount(async () => {
    try {
      setOptions(await loadOptions());
      setRefreshMode(await loadRefreshMode());
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  });

  onCleanup(() => clearTimeout(savedTimeout));

  const saveSettings = async () => {
    try {
      await chrome.storage.sync.set({
        options: options(),
        tabs: { refreshMode: refreshMode() },
      });
      setSaved(true);
      clearTimeout(savedTimeout);
      savedTimeout = setTimeout(() => setSaved(false), 1500);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const hasSelection = () => supportedDataTypes.some((key) => options()[key]);

  return (
    <main class="mx-auto max-w-xl px-3 py-4 md:py-8">
      <Card>
        <CardHeader class="flex-wrap">
          <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Trash2Icon class="size-[18px]" />
          </div>
          <div class="min-w-0 flex-1">
            <h1 class="text-[15px] leading-tight font-semibold tracking-tight">One Click History Cleaner</h1>
            <p class="mt-0.5 text-[13px] text-muted-foreground">{t('whatShouldBeRemoved')}</p>
          </div>
          <span role="status">
            <Badge variant={saved() ? 'success' : 'outline'}>
              <CheckIcon />
              {saved() ? t('notification_saved') : t('autoSaved')}
            </Badge>
          </span>
        </CardHeader>

        <CardContent class="space-y-5">
          <DataOptions options={options} setOptions={setOptions} onSave={saveSettings} />
          <hr />
          <TabBehavior refreshMode={refreshMode} setRefreshMode={setRefreshMode} onSave={saveSettings} />
        </CardContent>

        <CardFooter>
          <CleanButton disabled={!hasSelection()} />
          <p
            class="text-center text-xs"
            classList={{ 'text-muted-foreground': hasSelection(), 'text-destructive': !hasSelection() }}
          >
            {hasSelection() ? t('cleanTip') : t('nothingSelected')}
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </main>
  );
};
