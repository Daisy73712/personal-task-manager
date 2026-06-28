import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types';
import { formatDateTime, isPast, isToday, isTomorrow } from '@/utils/dateUtils';
import { Clock, Trash2, Edit3, Flag } from 'lucide-react';
import { useConfetti } from '@/components/common/Confetti';

interface TaskCardProps {
  task: Task;
  index?: number;
}

const priorityColors = {
  high: { bg: 'bg-bubblegum-500', text: 'text-bubblegum-600', light: 'bg-bubblegum-100', border: 'border-l-bubblegum-500' },
  medium: { bg: 'bg-peach-400', text: 'text-peach-600', light: 'bg-peach-100', border: 'border-l-peach-400' },
  low: { bg: 'bg-mint-400', text: 'text-mint-600', light: 'bg-mint-100', border: 'border-l-mint-400' },
};

export default function TaskCard({ task, index = 0 }: TaskCardProps) {
  const { toggleComplete, deleteTask, openTaskModal, categories } = useTaskStore();
  const { Confetti, triggerConfetti } = useConfetti();

  const category = categories.find((c) => c.id === task.categoryId);
  const priority = priorityColors[task.priority];
  const overdue = !task.completed && isPast(task.dueDate);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComplete(task.id);
    if (!task.completed) {
      triggerConfetti(e.clientX);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    openTaskModal(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const getDueLabel = () => {
    if (isToday(task.dueDate)) return 'Today';
    if (isTomorrow(task.dueDate)) return 'Tomorrow';
    return formatDateTime(task.dueDate);
  };

  return (
    <>
      <Confetti />
      <div
        className={`task-card glass-card rounded-2xl p-4 border-l-4 ${priority.border} ${
          task.completed ? 'opacity-60' : ''
        } animate-slide-up cursor-pointer`}
        style={{ animationDelay: `${index * 0.05}s` }}
        onClick={handleEdit}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggle}
            className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              task.completed
                ? 'bg-gradient-to-br from-mint-400 to-mint-500 border-mint-400 text-white'
                : 'border-gray-300 hover:border-bubblegum-400'
            }`}
          >
            {task.completed && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`font-semibold text-gray-800 ${
                  task.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {task.title}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={handleEdit}
                  className="w-8 h-8 rounded-full hover:bg-lavender-100 flex items-center justify-center text-gray-400 hover:text-lavender-500 transition-colors"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={handleDelete}
                  className="w-8 h-8 rounded-full hover:bg-bubblegum-100 flex items-center justify-center text-gray-400 hover:text-bubblegum-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {task.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {category && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  <span>{category.emoji}</span>
                  {category.name}
                </span>
              )}

              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${priority.light} ${priority.text}`}>
                <Flag size={12} />
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  overdue
                    ? 'bg-bubblegum-100 text-bubblegum-600'
                    : isToday(task.dueDate)
                    ? 'bg-mint-100 text-mint-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Clock size={12} />
                {getDueLabel()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
