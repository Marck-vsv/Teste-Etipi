import { forwardRef, type ComponentProps } from 'react';

interface TextAreaProps extends ComponentProps<'textarea'> {
  label: string;
  error?: string;
  isLoading?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, isLoading, className, ...props }, ref) => {
    const textareaClassName = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
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
        <textarea
          ref={ref}
          disabled={isLoading}
          className={textareaClassName}
          rows={4}
          {...props}
        />
        {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
