import { type Accessor, createSignal, For, onMount, type Setter, Show } from 'solid-js';
import { HISTORY_PERMISSION, normalizeExclusion, supportsSiteDataExclusions } from '../clearHistory';
import { t } from '../i18n/utils';
import { Button } from './ui/button';
import { PlusIcon, XIcon } from './ui/icons';

interface ExclusionsProps {
  exclusions: Accessor<string[]>;
  setExclusions: Setter<string[]>;
  onSave: () => Promise<void>;
}

export const Exclusions = (props: ExclusionsProps) => {
  const [input, setInput] = createSignal('');
  const [invalid, setInvalid] = createSignal(false);
  const [hasHistoryPermission, setHasHistoryPermission] = createSignal(true);

  onMount(async () => {
    try {
      setHasHistoryPermission(await chrome.permissions.contains(HISTORY_PERMISSION));
    } catch (error) {
      console.error('Failed to check the history permission:', error);
    }
  });

  // Firefox only shows the permission prompt when it is requested directly from the click, before any await
  const requestHistoryPermission = () =>
    chrome.permissions
      .request(HISTORY_PERMISSION)
      .then(setHasHistoryPermission)
      .catch((error) => console.error('Failed to request the history permission:', error));

  const update = (exclusions: string[]) => {
    props.setExclusions(exclusions);
    void props.onSave();
  };

  const add = (event: SubmitEvent) => {
    event.preventDefault();
    const domain = normalizeExclusion(input());
    if (!domain) {
      setInvalid(true);
      return;
    }
    if (!hasHistoryPermission()) void requestHistoryPermission();
    setInvalid(false);
    setInput('');
    if (!props.exclusions().includes(domain)) update([...props.exclusions(), domain].sort());
  };

  return (
    <section aria-labelledby="exclusions-title">
      <h2 id="exclusions-title" class="text-sm font-medium">
        {t('exclusions')}
      </h2>
      <p class="mb-2.5 text-xs text-muted-foreground">
        {supportsSiteDataExclusions ? t('exclusionsDescription') : t('exclusionsDescriptionFirefox')}
      </p>

      <form class="flex gap-2" onSubmit={add} novalidate>
        <input
          type="text"
          inputmode="url"
          autocomplete="off"
          spellcheck={false}
          value={input()}
          onInput={(event) => {
            setInput(event.currentTarget.value);
            setInvalid(false);
          }}
          placeholder={t('exclusionPlaceholder')}
          aria-label={t('exclusions')}
          aria-invalid={invalid()}
          aria-describedby={invalid() ? 'exclusion-error' : undefined}
          class="h-8 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-[13px] shadow-xs outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive dark:bg-input/30"
        />
        <Button type="submit" variant="outline" size="sm">
          <PlusIcon class="size-3.5" />
          {t('addExclusion')}
        </Button>
      </form>
      <Show when={invalid()}>
        <p id="exclusion-error" class="mt-1.5 text-xs text-destructive">
          {t('invalidExclusion')}
        </p>
      </Show>

      <Show
        when={props.exclusions().length > 0}
        fallback={<p class="mt-2.5 text-xs text-muted-foreground">{t('noExclusions')}</p>}
      >
        <ul class="mt-2.5 flex flex-wrap gap-1.5">
          <For each={props.exclusions()}>
            {(domain) => (
              <li class="flex items-center gap-1 rounded-md border bg-muted py-0.5 pr-0.5 pl-2 text-xs font-medium">
                {domain}
                <button
                  type="button"
                  onClick={() => update(props.exclusions().filter((entry) => entry !== domain))}
                  aria-label={t('removeExclusion', domain)}
                  class="grid size-5 cursor-pointer place-content-center rounded text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <XIcon class="size-3" />
                </button>
              </li>
            )}
          </For>
        </ul>
        <Show when={!hasHistoryPermission()}>
          <div class="mt-2.5 flex items-center gap-3 rounded-lg border px-3 py-2">
            <p class="flex-1 text-xs text-muted-foreground">{t('historyPermissionHint')}</p>
            <Button variant="outline" size="sm" onClick={() => void requestHistoryPermission()}>
              {t('grantHistoryPermission')}
            </Button>
          </div>
        </Show>
      </Show>
    </section>
  );
};
