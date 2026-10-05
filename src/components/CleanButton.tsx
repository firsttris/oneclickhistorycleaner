import { createSignal, Match, Switch } from 'solid-js';
import { clearHistory } from '../clearHistory';
import { t } from '../i18n/utils';
import { Button } from './ui/button';
import { CheckIcon, CircleAlertIcon, Loader2Icon, Trash2Icon } from './ui/icons';
import { toast } from './ui/toast';

type Status = 'idle' | 'cleaning' | 'done' | 'error';

export const CleanButton = (props: { disabled?: boolean }) => {
  const [status, setStatus] = createSignal<Status>('idle');

  const clean = async () => {
    setStatus('cleaning');
    const success = await clearHistory();
    setStatus(success ? 'done' : 'error');
    if (success) toast.success(t('notification_cleaningDone'));
    else toast.error(t('notification_cleaningFailed'));
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <Button
      size="lg"
      onClick={clean}
      disabled={props.disabled || status() !== 'idle'}
      aria-busy={status() === 'cleaning'}
      class="w-full"
      classList={{
        'bg-success! text-white! opacity-100!': status() === 'done',
        'bg-destructive! text-white! opacity-100!': status() === 'error',
      }}
    >
      <Switch
        fallback={
          <>
            <Trash2Icon />
            {t('cleanHistory')}
          </>
        }
      >
        <Match when={status() === 'cleaning'}>
          <Loader2Icon class="size-4 animate-spin" />
          {t('cleaningInProgress')}
        </Match>
        <Match when={status() === 'done'}>
          <CheckIcon />
          {t('cleaningDone')}
        </Match>
        <Match when={status() === 'error'}>
          <CircleAlertIcon />
          {t('notification_cleaningFailed')}
        </Match>
      </Switch>
    </Button>
  );
};
