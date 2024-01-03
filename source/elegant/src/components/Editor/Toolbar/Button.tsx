import clsx from 'clsx';
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'ghost'
export type ButtonSize = 'medium' | 'small' | 'icon' | 'iconSmall'

export type ButtonProps = {
  variant?: ButtonVariant
  active?: boolean
  activeClassname?: string
  buttonSize?: ButtonSize
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { active, buttonSize = 'medium', children, disabled, variant = 'primary', className, activeClassname, ...rest },
    ref,
  ) => {
    const buttonClassName = clsx(
      'flex group items-center justify-center border border-transparent gap-2 text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap',

      variant === 'primary' &&
        clsx(
          'text-white bg-black border-black dark:text-black dark:bg-white dark:border-white',
          !disabled &&
            !active &&
            'hover:bg-neutral-800 active:bg-neutral-900 dark:hover:bg-neutral-200 dark:active:bg-neutral-300',
          active && clsx('bg-neutral-900 dark:bg-neutral-300', activeClassname),
        ),

      variant === 'secondary' &&
        clsx(
          'text-neutral-900 dark:text-white',
          !disabled &&
            !active &&
            'hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-900 dark:active:bg-neutral-800',
          active && 'bg-neutral-200 dark:bg-neutral-800',
        ),

      variant === 'tertiary' &&
        clsx(
          'bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-white dark:border-neutral-900',
          !disabled &&
            !active &&
            'hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700',
          active && clsx('bg-neutral-200 dark:bg-neutral-800', activeClassname),
        ),

      variant === 'ghost' &&
        clsx(
          'bg-transparent border-transparent text-neutral-500 dark:text-neutral-400',
          !disabled &&
            !active &&
            'hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:hover:bg-white/10 dark:hover:text-neutral-300 dark:active:text-neutral-200',
          active && clsx('bg-black/10 text-neutral-800 dark:bg-white/20 dark:text-neutral-200', activeClassname),
        ),

      buttonSize === 'medium' && 'py-2 px-3',
      buttonSize === 'small' && 'py-1 px-2',
      buttonSize === 'icon' && 'w-8 h-8',
      buttonSize === 'iconSmall' && 'w-6 h-6',

      className,
    )

    return (
      <button ref={ref} disabled={disabled} className={buttonClassName} {...rest}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
