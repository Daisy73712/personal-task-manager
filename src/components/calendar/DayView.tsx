import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types';
import { formatTime, isToday, formatDate } from '@/utils/dateUtils';
import TaskChip from './TaskChip';
import { ChevronLeft, ChevronRight, Clock, Flag } from 'lucide-react';

interface DayViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onTaskClick: (task: Task) => void;
}

export default function DayView({ currentDate, onDateChange, onTaskClick }: DayViewProps) {
  const { getTasksByDate, categories, openTaskModal, setSelectedDate } = useTaskStore();
  const tasks = getTasksByDate(currentDate);
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const goToPrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const handleAddTask = () => {
    setSelectedDate(currentDate.toISOString());
    openTaskModal();
  };

  const priorityColors = {
    high: 'border-bubblegum-500 bg-bubblegum-50',
    medium: 'border-peach-400 bg-peach-50',
    low: 'border-mint-400 bg-mint-50',
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrevDay}
          className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-gray-500 hover:text-bubblegum-500 transition-all hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold gradient-text">
            {formatDate(currentDate)}
          </h2>
          {isToday(currentDate) && (
            <span className="text-sm text-bubblegum-500 font-medium">Today ✨</span>
          )}
        </div>
        <button
          onClick={goToNextDay}
          className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-gray-500 hover:text-bubblegum-500 transition-all hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <button
        onClick={handleAddTask}
        className="w-full py-4 mb-4 rounded-2xl border-2 border-dashed border-pink-200 text-bubblegum-500 font-medium hover:bg-bubblegum-50 transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-xl">+</span>
        Add task for this day
      </button>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🌷</div>
          <p className="text-gray-500">No tasks for this day</p>
          <p className="text-sm text-gray-400 mt-1">Enjoy your free time!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {sortedTasks.map((task) => {
            const category = categories.find((c) => c.id === task.categoryId);
            return (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                onDragEnd={handleDragEnd}
                onClick={() => onTaskClick(task)}
                className={`p-4 rounded-2xl border-l-4 ${priorityColors[task.priority]} bg-white cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-gray-800 ${
                        task.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-3">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        {formatTime(task.dueDate)}
                      </span>
                      {category && (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
                          style={{
                            backgroundColor: `${category.color}20`,
                            color: category.color,
                          }}
                        >
                          <span>{category.emoji}</span>
                          {category.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs">
                        <Flag
                          size={12}
                          className={
                            task.priority === 'high'
                              ? 'text-bubblegum-500'
                              : task.priority === 'medium'
                              ? 'text-peach-500'
                              : 'text-mint-500'
                          }
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
