const variants = {
  primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  secondary: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
}) {
  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
