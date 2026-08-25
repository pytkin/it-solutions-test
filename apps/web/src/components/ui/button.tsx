import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'outline' | 'primary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-violet-400 text-slate-950 shadow-[0_12px_32px_rgba(124,92,255,0.24)] hover:bg-violet-300',
  outline:
    'border-white/12 bg-white/[0.03] text-slate-100 hover:border-violet-300/40 hover:bg-violet-300/10',
};

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:pointer-events-none disabled:opacity-60',
        variantClassNames[variant],
        className,
      )}
      {...props}
    />
  );
}
