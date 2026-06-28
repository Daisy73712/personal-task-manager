import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { CalendarView as CalendarViewType, Task } from '@/types';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import { Calendar, CalendarDays, LayoutGrid } from 'lucide-react';

export default function CalendarView() {
  const { calendarView, setCalendarView, selectedDate, openTaskModal } = useTaskStore();
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleTaskClick = (task: Task) => {
    openTaskModal(task);
  };

  const viewOptions: { value: CalendarViewType; label: string; icon: typeof Calendar }[] = [
    { value: 'month', label: 'Month', icon: LayoutGrid },
    { value: 'week', label: 'Week', icon: CalendarDays },
    { value: 'day', label: 'Day', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="inline-flex bg-white/70 rounded-full p-1 shadow-sm">
          {viewOptions.map((option) => {
            const Icon = option.icon;
            const isActive = calendarView === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setCalendarView(option.value)}
                className={`px-5 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-bubblegum-400 to-lavender-400 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {calendarView === 'month' && (
        <MonthView
          currentDate={currentDate}
          onDateChange={handleDateChange}
          onTaskClick={handleTaskClick}
        />
      )}
      {calendarView === 'week' && (
        <WeekView
          currentDate={currentDate}
          onDateChange={handleDateChange}
          onTaskClick={handleTaskClick}
        />
      )}
      {calendarView === 'day' && (
        <DayView
          currentDate={currentDate}
          onDateChange={handleDateChange}
          onTaskClick={handleTaskClick}
        />
      )}
    </div>
  );
}
