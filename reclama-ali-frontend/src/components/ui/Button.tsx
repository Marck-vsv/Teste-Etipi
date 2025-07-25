import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

const buttonVariants = cva(
  'w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all duration-200 disabled:hover:scale-100',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:scale-[1.02]',
        secondary:
          'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
        ghost:
          'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        outline:
          'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl hover:scale-[1.02]',
      },
      size: {
        sm: 'py-2 px-3 text-sm',
        md: 'py-3 px-4',
        lg: 'py-4 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  children,
  variant,
  size,
  isLoading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isLoading}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
