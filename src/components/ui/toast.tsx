import { createSignal, For, Show } from 'solid-js';
import { CircleAlertIcon, CircleCheckIcon } from './icons';

type Toast = { id: number; title: string; description?: string; variant: 'success' | 'error' };

const [toasts, setToasts] = createSignal<Toast[]>([]);
let nextId = 0;

/** Minimal Sonner-style toast: `toast.success('Saved')`. Render <Toaster /> once. */
const show = (variant: Toast['variant']) => (title: string, description?: string) => {
  const id = nextId++;
  setToasts((list) => [...list, { id, title, description, variant }]);
  setTimeout(() => setToasts((list) => list.filter((item) => item.id !== id)), 3500);
};

export const toast = { success: show('success'), error: show('error') };

export const Toaster = () => (
  <div aria-live="polite" class="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col gap-2">
    <For each={toasts()}>
      {(item) => (
        <div class="flex w-[min(22rem,calc(100vw-2rem))] animate-[toast-in_.25s_ease-out] items-start gap-2.5 rounded-lg border bg-card px-3.5 py-3 text-sm text-card-foreground shadow-lg motion-reduce:animate-none">
          <Show
            when={item.variant === 'success'}
            fallback={<CircleAlertIcon class="mt-px size-4 shrink-0 text-destructive" />}
          >
            <CircleCheckIcon class="mt-px size-4 shrink-0 text-success" />
          </Show>
          <div class="min-w-0">
            <p class="font-medium">{item.title}</p>
            <Show when={item.description}>
              <p class="text-xs text-muted-foreground">{item.description}</p>
            </Show>
          </div>
        </div>
      )}
    </For>
  </div>
);
