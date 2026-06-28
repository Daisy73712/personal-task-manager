import { useTaskStore } from '@/store/taskStore';
import TaskCard from './TaskCard';
import { useState } from 'react';

export default function TaskList() {
  const { getFilteredTasks, filters, setFilters } = useTaskStore();
  const tasks = getFilteredTasks();

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const [showCompleted, setShowCompleted] = useState(true);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4 animate-bounce-gentle">🌸</div>
        <h3 className="text-xl font-display font-semibold text-gray-700 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500">
          {filters.search
            ? 'Try a different search term'
            : 'Add your first task to get started!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activeTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-display font-semibold text-gray-700">
              Active Tasks ({activeTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {activeTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center justify-between w-full mb-3 group"
          >
            <h2 className="text-lg font-display font-semibold text-gray-500">
              Completed ({completedTasks.length})
            </h2>
            <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
              {showCompleted ? 'Hide' : 'Show'}
            </span>
          </button>
          {showCompleted && (
            <div className="space-y-3">
              {completedTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
