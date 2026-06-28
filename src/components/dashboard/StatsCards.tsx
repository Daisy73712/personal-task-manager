import { useTaskStore } from '@/store/taskStore';
import { isToday, isThisWeek } from '@/utils/dateUtils';

export default function StatsCards() {
  const { tasks } = useTaskStore();

  const completedToday = tasks.filter(
    (t) => t.completed && isToday(t.updatedAt)
  ).length;

  const totalTasks = tasks.filter((t) => !t.completed).length;

  const upcomingThisWeek = tasks.filter(
    (t) => !t.completed && isThisWeek(t.dueDate)
  ).length;

  const stats = [
    {
      label: 'Done Today',
      value: completedToday,
      emoji: '🎉',
      gradient: 'from-bubblegum-400 to-bubblegum-500',
      bgLight: 'bg-bubblegum-50',
      textColor: 'text-bubblegum-600',
    },
    {
      label: 'Active Tasks',
      value: totalTasks,
      emoji: '📝',
      gradient: 'from-lavender-400 to-periwinkle-400',
      bgLight: 'bg-lavender-50',
      textColor: 'text-lavender-600',
    },
    {
      label: 'This Week',
      value: upcomingThisWeek,
      emoji: '✨',
      gradient: 'from-sky-400 to-mint-400',
      bgLight: 'bg-sky-50',
      textColor: 'text-sky-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`${stat.bgLight} rounded-3xl p-5 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-4xl font-display font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl shadow-lg`}>
              {stat.emoji}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
