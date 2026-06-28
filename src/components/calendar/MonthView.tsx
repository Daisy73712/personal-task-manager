import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types';
import { getDaysInMonth, isSameDay, isSameMonth, isToday, getMonthName, getDayName } from '@/utils/dateUtils';
import TaskChip from './TaskChip';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface MonthViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onTaskClick: (task: Task) => void;
}

export default function MonthView({ currentDate, onDateChange, onTaskClick }: MonthViewProps) {
  const { getTasksByDate, updateTask, openTaskModal, setSelectedDate } = useTaskStore();
  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverDay, setDragOverDay] = useState<Date | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverDay(day);
  };

  const handleDrop = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    if (draggedTask) {
      const originalDate = new Date(draggedTask.dueDate);
      const newDate = new Date(day);
      newDate.setHours(originalDate.getHours(), originalDate.getMinutes());
      updateTask(draggedTask.id, { dueDate: newDate.toISOString() });
    }
    setDraggedTask(null);
    setDragOverDay(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverDay(null);
  };

  const goToPrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day.toISOString());
    openTaskModal();
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrevMonth}
          className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-gray-500 hover:text-bubblegum-500 transition-all hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-display font-bold gradient-text">
          {getMonthName(currentDate)}
        </h2>
        <button
          onClick={goToNextMonth}
          className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-gray-500 hover:text-bubblegum-500 transition-all hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayTasks = getTasksByDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isTodayDay = isToday(day);
          const isDragOver = dragOverDay && isSameDay(dragOverDay, day);

          return (
            <div
              key={index}
              onDragOver={(e) => handleDragOver(e, day)}
              onDragLeave={() => setDragOverDay(null)}
              onDrop={(e) => handleDrop(e, day)}
              onClick={() => handleDayClick(day)}
              className={`min-h-28 p-2 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                isCurrentMonth ? 'bg-white/50' : 'bg-gray-50/50'
              } ${
                isTodayDay
                  ? 'border-bubblegum-300 bg-bubblegum-50/50 shadow-md'
                  : 'border-transparent'
              } ${
                isDragOver
                  ? 'border-lavender-400 bg-lavender-50 scale-105'
                  : 'hover:border-pink-200 hover:bg-pink-50/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-semibold ${
                    isTodayDay
                      ? 'w-7 h-7 rounded-full bg-gradient-to-br from-bubblegum-400 to-lavender-400 text-white flex items-center justify-center shadow-md'
                      : isCurrentMonth
                      ? 'text-gray-700'
                      : 'text-gray-400'
                  }`}
                >
                  {day.getDate()}
                </span>
                {dayTasks.length > 0 && (
                  <span className="text-xs text-gray-400">{dayTasks.length}</span>
                )}
              </div>
              <div className="space-y-1" onDragEnd={handleDragEnd}>
                {dayTasks.slice(0, 3).map((task) => (
                  <TaskChip
                    key={task.id}
                    task={task}
                    compact
                    onDragStart={handleDragStart}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskClick(task);
                    }}
                  />
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-gray-500 pl-1">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
