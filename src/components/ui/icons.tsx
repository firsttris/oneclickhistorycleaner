import type { JSX } from 'solid-js';

/** Lucide icons (https://lucide.dev, ISC license), inlined so the bundle only carries the few we use. */
const Icon = (props: { class?: string; children: JSX.Element }) => (
  <svg
    class={props.class ?? 'size-4'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    {props.children}
  </svg>
);

type IconProps = { class?: string };

export const Trash2Icon = (props: IconProps) => (
  <Icon class={props.class}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </Icon>
);

export const CheckIcon = (props: IconProps) => (
  <Icon class={props.class}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const CircleCheckIcon = (props: IconProps) => (
  <Icon class={props.class}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const CircleAlertIcon = (props: IconProps) => (
  <Icon class={props.class}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </Icon>
);

export const Loader2Icon = (props: IconProps) => (
  <Icon class={props.class}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Icon>
);

export const HistoryIcon = (props: IconProps) => (
  <Icon class={props.class}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </Icon>
);

export const CookieIcon = (props: IconProps) => (
  <Icon class={props.class}>
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
    <path d="M8.5 8.5v.01" />
    <path d="M16 15.5v.01" />
    <path d="M12 12v.01" />
    <path d="M11 17v.01" />
    <path d="M7 14v.01" />
  </Icon>
);

export const DatabaseIcon = (props: IconProps) => (
  <Icon class={props.class}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </Icon>
);

export const TriangleAlertIcon = (props: IconProps) => (
  <Icon class={props.class}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </Icon>
);
