import { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  helper,
  className = '',
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border ${error ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-primary-500'} focus:border-transparent transition-all duration-200 resize-none ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
      {helper && !error && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
