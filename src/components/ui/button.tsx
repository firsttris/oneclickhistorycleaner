import { type JSX, splitProps } from 'solid-js';

const base =
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50';

const variants = {
  default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
  outline:
    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

const sizes = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 gap-1.5 px-3 text-xs',
  lg: 'h-10 px-6',
};

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const Button = (props: ButtonProps) => {
  const [local, rest] = splitProps(props, ['variant', 'size', 'class']);
  return (
    <button
      type="button"
      class={`${base} ${variants[local.variant ?? 'default']} ${sizes[local.size ?? 'default']} ${local.class ?? ''}`}
      {...rest}
    />
  );
};
