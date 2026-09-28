import { createSignal, Match, Switch } from 'solid-js';
import { clearHistory } from '../clearHistory';
import { t } from '../i18n/utils';

type Status = 'idle' | 'cleaning' | 'done' | 'error';

export const CleanButton = (props: { disabled?: boolean }) => {
  const [status, setStatus] = createSignal<Status>('idle');

  const clean = async () => {
    setStatus('cleaning');
    setStatus((await clearHistory()) ? 'done' : 'error');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <button
      type="button"
      onClick={clean}
      disabled={props.disabled || status() !== 'idle'}
      aria-busy={status() === 'cleaning'}
      class="flex w-full items-center justify-center gap-1.5 rounded-md bg-primary-600 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-60"
      classList={{
        'bg-green-600! hover:bg-green-600!': status() === 'done',
        'bg-red-600! hover:bg-red-600!': status() === 'error',
      }}
    >
      <Switch
        fallback={
          <>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>{t('cleanHistory')}</span>
          </>
        }
      >
        <Match when={status() === 'cleaning'}>
          <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>{t('cleaningInProgress')}</span>
        </Match>
        <Match when={status() === 'done'}>
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{t('cleaningDone')}</span>
        </Match>
        <Match when={status() === 'error'}>
          <span>{t('notification_cleaningFailed')}</span>
        </Match>
      </Switch>
    </button>
  );
};
