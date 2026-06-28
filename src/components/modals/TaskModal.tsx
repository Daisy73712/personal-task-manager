import { useState, useEffect } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { Priority, Task } from '@/types';
import { X, Calendar, Flag, Tag, AlignLeft } from 'lucide-react';

const priorityOptions: { value: Priority; label: string; color: string; bgColor: string }[] = [
  { value: 'high', label: 'High', color: '#ec4899', bgColor: '#fce7f3' },
  { value: 'medium', label: 'Medium', color: '#f59e0b', bgColor: '#fef3c7' },
  { value: 'low', label: 'Low', color: '#22c55e', bgColor: '#dcfce7' },
];

export default function TaskModal() {
  const { taskModalOpen, closeTaskModal, editingTask, addTask, updateTask, categories } = useTaskStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [categoryId, setCategoryId] = useState('personal');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setCategoryId(editingTask.categoryId);
      const date = new Date(editingTask.dueDate);
      setDueDate(date.toISOString().split('T')[0]);
      setDueTime(date.toTimeString().slice(0, 5));
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategoryId('personal');
      const today = new Date();
      setDueDate(today.toISOString().split('T')[0]);
      setDueTime('12:00');
    }
  }, [editingTask, taskModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const fullDueDate = new Date(`${dueDate}T${dueTime}`).toISOString();

    if (editingTask) {
      updateTask(editingTask.id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        categoryId,
        dueDate: fullDueDate,
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        categoryId,
        dueDate: fullDueDate,
        completed: false,
      });
    }

    closeTaskModal();
  };

  if (!taskModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closeTaskModal}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col">
        <div className="bg-gradient-to-r from-bubblegum-400 via-lavender-400 to-periwinkle-400 p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                {editingTask ? 'Edit Task ✏️' : 'New Task ✨'}
              </h2>
              <p className="text-white/80 text-sm mt-1">
                {editingTask ? 'Update your task details' : 'Create something amazing!'}
              </p>
            </div>
            <button
              onClick={closeTaskModal}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form id="task-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag size={16} className="text-bubblegum-500" />
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-bubblegum-300 transition-colors text-gray-700"
              autoFocus
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <AlignLeft size={16} className="text-lavender-500" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-lavender-300 transition-colors text-gray-700 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="text-sky-500" />
                Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-sky-300 transition-colors text-gray-700"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="text-peach-500" />
                Time
              </label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-peach-300 transition-colors text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Flag size={16} className="text-bubblegum-500" />
              Priority
            </label>
            <div className="flex gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                    priority === option.value
                      ? 'scale-105 shadow-md'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: option.bgColor,
                    color: option.color,
                    border: priority === option.value ? `2px solid ${option.color}` : '2px solid transparent',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              🏷️ Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setCategoryId(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    categoryId === category.id
                      ? 'scale-105 shadow-md'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                    border: categoryId === category.id ? `2px solid ${category.color}` : '2px solid transparent',
                  }}
                >
                  <span>{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 flex-shrink-0 bg-white">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={closeTaskModal}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="task-form"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-bubblegum-400 to-lavender-400 text-white font-semibold hover:shadow-lg hover:shadow-bubblegum-200 transition-all hover:scale-105"
            >
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
