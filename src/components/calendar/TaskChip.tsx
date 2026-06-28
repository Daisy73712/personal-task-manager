import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types';
import { formatTime } from '@/utils/dateUtils';

interface TaskChipProps {
  task: Task;
  compact?: boolean;
  onDragStart?: (e: React.DragEvent, task: Task) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export default function TaskChip({ task, compact = false, onDragStart, onClick }: TaskChipProps) {
  const { categories } = useTaskStore();
  const category = categories.find((c) => c.id === task.categoryId);

  const priorityBorders: Record<string, string> = {
    high: 'ring-2 ring-bubblegum-400',
    medium: 'ring-1 ring-peach-300',
    low: '',
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, task)}
      onClick={onClick}
      className={`task-chip px-2 py-1 rounded-lg text-xs font-medium text-white truncate cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105 hover:shadow-md ${priorityBorders[task.priority]} ${
        task.completed ? 'opacity-50 line-through' : ''
      }`}
      style={{ backgroundColor: category?.color || '#9ca3af' }}
      title={`${task.title} - ${formatTime(task.dueDate)}`}
    >
      {!compact && <span className="mr-1">{category?.emoji}</span>}
      {task.title}
    </div>
  );
}
