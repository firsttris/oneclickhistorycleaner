import type { JSX } from 'solid-js';

const variants = {
  outline: 'text-muted-foreground',
  success: 'border-success/40 text-success',
  destructive: 'border-destructive/30 bg-destructive/10 text-destructive',
};

export const Badge = (props: { variant?: keyof typeof variants; class?: string; children: JSX.Element }) => (
  <span
    class={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors [&>svg]:size-3 ${variants[props.variant ?? 'outline']} ${props.class ?? ''}`}
  >
    {props.children}
  </span>
);
