import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.ComponentProps<'input'> {}

export const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={twMerge(
        'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  );
};
