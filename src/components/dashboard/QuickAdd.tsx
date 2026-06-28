import { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { Plus, Search, Filter } from 'lucide-react';

export default function QuickAdd() {
  const [title, setTitle] = useState('');
  const { addTask, openTaskModal, filters, setFilters } = useTaskStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: '',
      priority: 'medium',
      categoryId: 'personal',
      dueDate: new Date().toISOString(),
      completed: false,
    });
    setTitle('');
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="glass-card rounded-3xl p-4 shadow-sm">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bubblegum-400 to-lavender-400 flex items-center justify-center text-white shadow-md flex-shrink-0 hover:scale-105 transition-transform cursor-pointer">
            <Plus size={24} />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task... ✨"
            className="flex-1 bg-white/50 rounded-xl px-4 py-3 border border-pink-100 text-gray-700 placeholder-gray-400 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="btn-primary px-6 py-3 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => openTaskModal()}
            className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-xl bg-lavender-100 text-lavender-600 font-medium hover:bg-lavender-200 transition-colors"
          >
            <Filter size={18} />
            Details
          </button>
        </form>
      </div>

      <div className="glass-card rounded-2xl p-3 flex items-center gap-3">
        <Search size={18} className="text-gray-400 flex-shrink-0 ml-2" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="Search tasks..."
          className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        {filters.search && (
          <button
            onClick={() => setFilters({ search: '' })}
            className="text-gray-400 hover:text-gray-600 mr-2"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
