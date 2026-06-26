import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Settings, ListFilter as Filter } from 'lucide-react';
import { Button } from '../components/ui';
import { NotificationCard } from '../components/features';
import { fetchNotifications, markNotificationsRead } from '../lib/supabase';

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNotifications();
        setNotificationList(data);
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    };
    load();
  }, []);

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const filteredNotifications =
    filter === 'all'
      ? notificationList
      : filter === 'unread'
      ? notificationList.filter((n) => !n.read)
      : notificationList.filter((n) => n.type === filter);

  const markAllRead = async () => {
    try {
      await markNotificationsRead();
      setNotificationList(
        notificationList.map((n) => ({ ...n, read: true }))
      );
    } catch (err) {
      console.error('Failed to mark notifications as read:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Notifications
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up!'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck className="w-4 h-4" />
                Mark all read
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex overflow-x-auto gap-2">
            {['all', 'unread', 'idea_approved', 'new_applicant', 'project_update', 'builder_invitation'].map(
              (filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    filter === filterOption
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {filterOption === 'all'
                    ? 'All'
                    : filterOption === 'unread'
                    ? 'Unread'
                    : filterOption === 'idea_approved'
                    ? 'Approvals'
                    : filterOption === 'new_applicant'
                    ? 'Applications'
                    : filterOption === 'project_update'
                    ? 'Updates'
                    : 'Invitations'}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No notifications
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {filter !== 'all'
                ? 'Try changing the filter to see more notifications'
                : "You're all caught up!"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
