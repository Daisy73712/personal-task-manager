import { useTaskStore } from '@/store/taskStore';
import { Calendar, CheckSquare, Bell, Search } from 'lucide-react';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import UserMenu from './UserMenu';

interface HeaderProps {
  currentView: 'dashboard' | 'calendar';
  onViewChange: (view: 'dashboard' | 'calendar') => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const { tasks, notifications, toggleNotificationsPanel, notificationsOpen } = useTaskStore();
  const upcomingTasks = tasks.filter(
    (t) => !t.completed && new Date(t.dueDate) > new Date()
  ).length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 glass-card border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bubblegum-400 to-lavender-400 flex items-center justify-center text-2xl shadow-lg animate-float">
              ✨
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                SparkleTask
              </h1>
              <p className="text-xs text-gray-500 font-body">
                Make productivity magical 🌸
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                currentView === 'dashboard'
                  ? 'bg-gradient-to-r from-bubblegum-400 to-bubblegum-500 text-white shadow-lg shadow-bubblegum-200'
                  : 'text-gray-600 hover:bg-bubblegum-50'
              }`}
            >
              <CheckSquare size={18} />
              <span className="hidden sm:inline">Tasks</span>
            </button>
            <button
              onClick={() => onViewChange('calendar')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                currentView === 'calendar'
                  ? 'bg-gradient-to-r from-lavender-400 to-periwinkle-400 text-white shadow-lg shadow-lavender-200'
                  : 'text-gray-600 hover:bg-lavender-50'
              }`}
            >
              <Calendar size={18} />
              <span className="hidden sm:inline">Calendar</span>
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <button className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-bubblegum-500 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Search size={20} />
              </button>
            </div>
            <div className="relative">
              <button
                onClick={toggleNotificationsPanel}
                className={`w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                  notificationsOpen
                    ? 'text-bubblegum-500 shadow-lg bg-bubblegum-50'
                    : 'text-gray-500 hover:text-bubblegum-500 hover:shadow-lg'
                }`}
              >
                <Bell size={20} />
              </button>
              {(unreadNotifications > 0 || upcomingTasks > 0) && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-bubblegum-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-gentle">
                  {unreadNotifications > 0 ? unreadNotifications : upcomingTasks}
                </span>
              )}
              <NotificationPanel />
            </div>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
