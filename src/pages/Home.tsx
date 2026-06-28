import { useState } from 'react';
import Header from '@/components/layout/Header';
import SparkleBg from '@/components/layout/SparkleBg';
import Toasts from '@/components/common/Toasts';
import StatsCards from '@/components/dashboard/StatsCards';
import CategoryFilters from '@/components/dashboard/CategoryFilters';
import QuickAdd from '@/components/dashboard/QuickAdd';
import TaskList from '@/components/dashboard/TaskList';
import CalendarView from '@/components/calendar/CalendarView';
import TaskModal from '@/components/modals/TaskModal';
import AuthModal from '@/components/modals/AuthModal';
import { useTaskReminders } from '@/hooks/useTaskReminders';
import { useTaskStore } from '@/store/taskStore';
import { Plus } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'calendar'>('dashboard');
  const { requestNotificationPermission } = useTaskReminders();
  const { openTaskModal, user, openAuthModal, addNotification } = useTaskStore();

  const handleNotificationEnable = () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    requestNotificationPermission();
    addNotification({
      title: 'Notifications Enabled! 🔔',
      message: 'You will now receive reminders for your tasks.',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen relative">
      <SparkleBg />
      <Toasts />
      <TaskModal />
      <AuthModal />

      <Header currentView={currentView} onViewChange={setCurrentView} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {currentView === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="animate-slide-up">
                <h2 className="text-3xl font-display font-bold mb-1">
                  Hey {user ? `${user.name.split(' ')[0]}` : 'there'}! <span className="animate-wiggle inline-block">👋</span>
                </h2>
                <p className="text-gray-500">
                  Let's make today productive and sparkly ✨
                </p>
              </div>
              
              <QuickAdd />
              <CategoryFilters />
              <TaskList />
            </div>

            <div className="space-y-6">
              <StatsCards />
              
              <div className="glass-card rounded-3xl p-5">
                <h3 className="font-display font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <span>💡</span> Quick Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-bubblegum-400">🌸</span>
                    Click on tasks to edit them
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lavender-400">📅</span>
                    Drag tasks on the calendar to reschedule
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mint-400">✅</span>
                    Check off tasks for confetti!
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-peach-400">🔔</span>
                    {user ? 'Enable notifications for reminders' : 'Sign in to save your tasks'}
                  </li>
                </ul>
                <button
                  onClick={handleNotificationEnable}
                  className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-peach-400 to-bubblegum-400 text-white text-sm font-medium hover:shadow-md transition-all hover:scale-105"
                >
                  {user ? 'Enable Notifications 🔔' : 'Sign In to Save 💖'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <CalendarView />
        )}
      </main>

      <button
        onClick={() => openTaskModal()}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-bubblegum-400 to-lavender-500 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-40 animate-pulse-glow"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
