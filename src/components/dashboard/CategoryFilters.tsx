import { useTaskStore } from '@/store/taskStore';
import { Category } from '@/types';

export default function CategoryFilters() {
  const { categories, filters, setFilters } = useTaskStore();

  const handleCategoryClick = (categoryId: string | null) => {
    setFilters({ categoryId: filters.categoryId === categoryId ? null : categoryId });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`flex-shrink-0 px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
            filters.categoryId === null
              ? 'bg-gradient-to-r from-bubblegum-400 to-lavender-400 text-white shadow-md'
              : 'bg-white/70 text-gray-600 hover:bg-white hover:shadow-sm'
          }`}
        >
          🌈 All Tasks
        </button>
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex-shrink-0 px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
              filters.categoryId === category.id
                ? 'text-white shadow-md'
                : 'bg-white/70 text-gray-600 hover:bg-white hover:shadow-sm'
            }`}
            style={
              filters.categoryId === category.id
                ? { background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }
                : {}
            }
          >
            <span>{category.emoji}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
