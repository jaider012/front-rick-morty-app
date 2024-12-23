import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          ref={ref}
          className={clsx(
            'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2',
            'text-sm placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';