import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types';
import { getWeekDays, isToday, formatTime, isSameDay } from '@/utils/dateUtils';
import TaskChip from './TaskChip';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeekViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onTaskClick: (task: Task) => void;
}

export default function WeekView({ currentDate, onDateChange, onTaskClick }: WeekViewProps) {
  const { getTasksByDate, updateTask, openTaskModal, setSelectedDate } = useTaskStore();
  const weekDays = getWeekDays(currentDate);

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

  const goToPrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    onDateChange(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    onDateChange(newDate);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day.toISOString());
    openTaskModal();
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 8);

  return (
    <div className="glass-card rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrevWeek}
          className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-gray-500 hover:text-bubblegum-500 transition-all hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-display font-bold gradient-text">
          This Week
        </h2>
        <button
          onClick={goToNextWeek}
          className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-gray-500 hover:text-bubblegum-500 transition-all hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="text-center text-sm font-semibold text-gray-400 py-2">
              Time
            </div>
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={`text-center py-2 rounded-xl ${
                  isToday(day) ? 'bg-bubblegum-100 text-bubblegum-700' : 'text-gray-600'
                }`}
              >
                <p className="text-xs font-medium">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p
                  className={`text-lg font-display font-bold ${
                    isToday(day) ? 'text-bubblegum-600' : ''
                  }`}
                >
                  {day.getDate()}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-1">
                <div className="text-xs text-gray-400 text-right pr-2 py-3">
                  {hour}:00
                </div>
                {weekDays.map((day) => {
                  const dayTasks = getTasksByDate(day).filter((task) => {
                    const taskHour = new Date(task.dueDate).getHours();
                    return taskHour === hour;
                  });
                  const isDragOver = dragOverDay && isSameDay(dragOverDay, day);

                  return (
                    <div
                      key={day.toISOString() + hour}
                      onDragOver={(e) => handleDragOver(e, day)}
                      onDragLeave={() => setDragOverDay(null)}
                      onDrop={(e) => handleDrop(e, day)}
                      onClick={() => handleDayClick(day)}
                      className={`h-14 p-1 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        isToday(day)
                          ? 'bg-bubblegum-50/50 border-bubblegum-200'
                          : 'bg-white/30 border-transparent'
                      } ${
                        isDragOver
                          ? 'border-lavender-400 bg-lavender-50 scale-105'
                          : 'hover:border-pink-200 hover:bg-pink-50/30'
                      }`}
                    >
                      <div className="space-y-1" onDragEnd={handleDragEnd}>
                        {dayTasks.map((task) => (
                          <TaskChip
                            key={task.id}
                            task={task}
                            onDragStart={handleDragStart}
                            onClick={(e) => {
                              e.stopPropagation();
                              onTaskClick(task);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
