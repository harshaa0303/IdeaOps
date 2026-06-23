import { motion } from 'framer-motion';
import { Bell, UserPlus, CircleCheck as CheckCircle, CircleAlert as AlertCircle, MessageCircle } from 'lucide-react';

const icons = {
  idea_approved: CheckCircle,
  new_applicant: UserPlus,
  project_update: AlertCircle,
  builder_invitation: MessageCircle,
  default: Bell,
};

const colors = {
  idea_approved: 'text-green-500 bg-green-100 dark:bg-green-900/30',
  new_applicant: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
  project_update: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
  builder_invitation: 'text-primary-500 bg-primary-100 dark:bg-primary-900/30',
  default: 'text-slate-500 bg-slate-100 dark:bg-slate-800',
};

export default function NotificationCard({ notification, index = 0 }) {
  const Icon = icons[notification.type] || icons.default;
  const colorClass = colors[notification.type] || colors.default;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative flex items-start gap-4 p-4 rounded-xl transition-all ${
        notification.read
          ? 'bg-white dark:bg-slate-800'
          : 'bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800'
      }`}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full" />
      )}

      {/* Icon */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-slate-900 dark:text-white">
            {notification.title}
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
            {formatTime(notification.timestamp)}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          {notification.message}
        </p>
      </div>
    </motion.div>
  );
}
