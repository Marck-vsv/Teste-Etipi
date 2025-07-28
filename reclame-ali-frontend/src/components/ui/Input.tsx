import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { IMaskInput } from 'react-imask';

interface InputProps extends Omit<ComponentProps<'input'>, 'mask'> {
  label: string;
  error?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  mask?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, icon, isLoading, className, mask, onChange, ...props },
    ref,
  ) => {
    const inputClassName = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
      error
        ? 'border-red-500 bg-red-50'
        : 'border-gray-300 hover:border-gray-400'
    } ${className || ''}`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="relative">
          {mask ? (
            <IMaskInput
              mask={mask as any}
              disabled={isLoading}
              className={inputClassName}
              inputRef={ref}
              onAccept={(value: string) => {
                if (onChange) {
                  onChange({
                    target: { value },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              {...(props as any)}
            />
          ) : (
            <input
              ref={ref}
              disabled={isLoading}
              className={inputClassName}
              onChange={onChange}
              {...props}
            />
          )}
          {icon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {icon}
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
