import type { JSX } from 'solid-js';

type DivProps = { class?: string; children: JSX.Element };

export const Card = (props: DivProps) => (
  <div class={`rounded-xl border bg-card text-card-foreground shadow-sm ${props.class ?? ''}`}>{props.children}</div>
);

export const CardHeader = (props: DivProps) => (
  <div class={`flex items-start gap-3 px-5 pt-5 ${props.class ?? ''}`}>{props.children}</div>
);

export const CardContent = (props: DivProps) => <div class={`px-5 py-5 ${props.class ?? ''}`}>{props.children}</div>;

export const CardFooter = (props: DivProps) => (
  <div class={`flex flex-col gap-2.5 px-5 pb-5 ${props.class ?? ''}`}>{props.children}</div>
);
