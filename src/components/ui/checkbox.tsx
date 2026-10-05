import { createEffect, type JSX, splitProps } from 'solid-js';

type CheckboxProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'> & { indeterminate?: boolean };

/** shadcn/ui Checkbox look on a native input, so labels, keyboard and forms work as usual. */
export const Checkbox = (props: CheckboxProps) => {
  const [local, rest] = splitProps(props, ['indeterminate', 'class']);
  let ref: HTMLInputElement | undefined;
  createEffect(() => {
    if (ref) ref.indeterminate = !!local.indeterminate;
  });
  return (
    <input
      ref={ref}
      type="checkbox"
      class={`peer mt-px grid size-4 shrink-0 cursor-pointer appearance-none place-content-center rounded-[4px] border border-input bg-background shadow-xs outline-none transition-shadow focus-visible:ring-[3px] focus-visible:ring-ring/50 checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary dark:bg-input/30 checked:after:h-[5px] checked:after:w-[9px] checked:after:-translate-y-px checked:after:-rotate-45 checked:after:border-b-2 checked:after:border-l-2 checked:after:border-primary-foreground checked:after:content-[''] indeterminate:after:h-0.5 indeterminate:after:w-2 indeterminate:after:rounded-full indeterminate:after:bg-primary-foreground indeterminate:after:content-[''] ${local.class ?? ''}`}
      {...rest}
    />
  );
};
