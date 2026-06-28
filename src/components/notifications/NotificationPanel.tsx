import { useTaskStore } from '@/store/taskStore';
import { Notification } from '@/types';
import { formatDateTime } from '@/utils/dateUtils';
import { X, CheckCheck, Trash2, Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';

const notificationIcons = {
  reminder: AlertCircle,
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
};

const notificationColors = {
  reminder: 'text-bubblegum-500 bg-bubblegum-50',
  info: 'text-sky-500 bg-sky-50',
  success: 'text-mint-500 bg-mint-50',
  warning: 'text-peach-500 bg-peach-50',
};

export default function NotificationPanel() {
  const {
    notifications,
    notificationsOpen,
    closeNotificationsPanel,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useTaskStore();

  if (!notificationsOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={closeNotificationsPanel}
      />
      <div className="absolute right-0 top-full mt-2 w-96 max-h-96 bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden z-50 animate-slide-up">
        <div className="bg-gradient-to-r from-bubblegum-400 to-lavender-400 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Bell size={20} />
              <h3 className="font-display font-bold text-lg">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={closeNotificationsPanel}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex gap-2 p-3 border-b border-gray-100">
            <button
              onClick={markAllNotificationsRead}
              className="flex items-center gap-1 text-xs text-lavender-500 hover:text-lavender-600 font-medium px-3 py-1.5 rounded-lg hover:bg-lavender-50 transition-colors"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
            <button
              onClick={clearNotifications}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Trash2 size={14} />
              Clear all
            </button>
          </div>
        )}

        <div className="overflow-y-auto max-h-72">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">🔔</div>
              <p className="text-gray-500 text-sm">No notifications yet</p>
              <p className="text-gray-400 text-xs mt-1">
                You're all caught up! ✨
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map((notification: Notification) => {
                const Icon = notificationIcons[notification.type];
                const colorClass = notificationColors[notification.type];
                return (
                  <div
                    key={notification.id}
                    onClick={() => markNotificationRead(notification.id)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-pink-50/50 ${
                      !notification.read ? 'bg-bubblegum-50/30' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDateTime(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-bubblegum-500 flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
