import { useEffect, useRef } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { getTimeUntilDue } from '@/utils/dateUtils';

const REMINDER_MINUTES_BEFORE = 15;

export function useTaskReminders() {
  const { tasks, addToast, markReminderSent, addNotification } = useTaskStore();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      
      tasks.forEach((task) => {
        if (task.completed || task.reminderSent) return;

        const dueDate = new Date(task.dueDate);
        const diffMs = dueDate.getTime() - now.getTime();
        const diffMinutes = diffMs / (1000 * 60);

        if (diffMinutes > 0 && diffMinutes <= REMINDER_MINUTES_BEFORE) {
          const message = `"${task.title}" is due in ${Math.round(diffMinutes)} minutes!`;
          addToast(
            `⏰ Reminder: ${message}`,
            'warning'
          );
          addNotification({
            title: 'Task Reminder ⏰',
            message,
            type: 'reminder',
            taskId: task.id,
          });
          markReminderSent(task.id);

          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('SparkleTask Reminder ✨', {
              body: `${task.title} is due soon!`,
              icon: '🌸',
            });
          }
        }
      });
    };

    checkReminders();

    intervalRef.current = window.setInterval(checkReminders, 60000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tasks, addToast, markReminderSent, addNotification]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        addToast('Notifications enabled! 🔔', 'success');
      }
    }
  };

  return { requestNotificationPermission };
}
