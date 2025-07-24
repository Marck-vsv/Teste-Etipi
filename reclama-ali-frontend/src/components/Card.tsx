import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends ComponentProps<'div'> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        'container flex flex-col gap-6 rounded-xl p-6 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
