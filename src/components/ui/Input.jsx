import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helper,
  icon,
  className = '',
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border ${error ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-primary-500'} focus:border-transparent transition-all duration-200 ${icon ? 'pl-12' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
      {helper && !error && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
