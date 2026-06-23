import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  label,
  error,
  helper,
  options,
  placeholder = 'Select...',
  className = '',
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
        <select
          ref={ref}
          className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border ${error ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-primary-500'} focus:border-transparent transition-all duration-200 appearance-none cursor-pointer ${className}`}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
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

Select.displayName = 'Select';

export default Select;
