import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task, Category, TaskFilters, Priority, Toast, CalendarView, Notification, User, AuthModalMode } from '@/types';
import { defaultCategories, mockTasks } from '@/data/mockData';

interface TaskStore {
  tasks: Task[];
  categories: Category[];
  filters: TaskFilters;
  calendarView: CalendarView;
  selectedDate: string;
  toasts: Toast[];
  taskModalOpen: boolean;
  editingTask: Task | null;
  notifications: Notification[];
  notificationsOpen: boolean;
  user: User | null;
  authModalOpen: boolean;
  authModalMode: AuthModalMode;
  
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  setCalendarView: (view: CalendarView) => void;
  setSelectedDate: (date: string) => void;
  openTaskModal: (task?: Task) => void;
  closeTaskModal: () => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  getFilteredTasks: () => Task[];
  getTasksByDate: (date: Date) => Task[];
  markReminderSent: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  toggleNotificationsPanel: () => void;
  closeNotificationsPanel: () => void;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  openAuthModal: (mode: AuthModalMode) => void;
  closeAuthModal: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: mockTasks,
      categories: defaultCategories,
      filters: {
        search: '',
        categoryId: null,
        priority: null,
        status: 'all',
        dateFrom: null,
        dateTo: null,
      },
      calendarView: 'month',
      selectedDate: new Date().toISOString(),
      toasts: [],
      taskModalOpen: false,
      editingTask: null,
      notifications: [],
      notificationsOpen: false,
      user: null,
      authModalOpen: false,
      authModalMode: null,

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
        get().addToast('Task added! ✨', 'success');
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
          ),
        }));
        get().addToast('Task updated! 💕', 'success');
      },

      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
        get().addToast('Task deleted', 'info');
      },

      toggleComplete: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
        const task = get().tasks.find((t) => t.id === id);
        if (task?.completed) {
          get().addToast('Yay! Task completed! 🎉', 'success');
        }
      },

      addCategory: (categoryData) => {
        const newCategory: Category = {
          ...categoryData,
          id: generateId(),
        };
        set((state) => ({ categories: [...state.categories, newCategory] }));
      },

      setFilters: (newFilters) => {
        set((state) => ({ filters: { ...state.filters, ...newFilters } }));
      },

      setCalendarView: (view) => {
        set({ calendarView: view });
      },

      setSelectedDate: (date) => {
        set({ selectedDate: date });
      },

      openTaskModal: (task?) => {
        set({ taskModalOpen: true, editingTask: task || null });
      },

      closeTaskModal: () => {
        set({ taskModalOpen: false, editingTask: null });
      },

      addToast: (message, type = 'info') => {
        const id = generateId();
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        setTimeout(() => {
          get().removeToast(id);
        }, 3000);
      },

      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
      },

      getFilteredTasks: () => {
        const { tasks, filters } = get();
        return tasks.filter((task) => {
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            if (
              !task.title.toLowerCase().includes(searchLower) &&
              !task.description.toLowerCase().includes(searchLower)
            ) {
              return false;
            }
          }
          if (filters.categoryId && task.categoryId !== filters.categoryId) {
            return false;
          }
          if (filters.priority && task.priority !== filters.priority) {
            return false;
          }
          if (filters.status === 'active' && task.completed) {
            return false;
          }
          if (filters.status === 'completed' && !task.completed) {
            return false;
          }
          if (filters.dateFrom) {
            if (new Date(task.dueDate) < new Date(filters.dateFrom)) {
              return false;
            }
          }
          if (filters.dateTo) {
            if (new Date(task.dueDate) > new Date(filters.dateTo)) {
              return false;
            }
          }
          return true;
        });
      },

      getTasksByDate: (date) => {
        const { tasks } = get();
        const dateStr = date.toDateString();
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return taskDate.toDateString() === dateStr;
        });
      },

      markReminderSent: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, reminderSent: true } : task
          ),
        }));
      },

      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: generateId(),
          read: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },

      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
        get().addToast('All notifications marked as read ✨', 'success');
      },

      clearNotifications: () => {
        set({ notifications: [] });
        get().addToast('Notifications cleared', 'info');
      },

      toggleNotificationsPanel: () => {
        set((state) => ({ notificationsOpen: !state.notificationsOpen }));
      },

      closeNotificationsPanel: () => {
        set({ notificationsOpen: false });
      },

      login: (email, password) => {
        if (email && password) {
          const newUser: User = {
            id: generateId(),
            name: email.split('@')[0],
            email,
          };
          set({ user: newUser, authModalOpen: false, authModalMode: null });
          get().addToast(`Welcome back, ${newUser.name}! 💕`, 'success');
          return true;
        }
        get().addToast('Please enter your email and password', 'error');
        return false;
      },

      signup: (name, email, password) => {
        if (name && email && password) {
          const newUser: User = {
            id: generateId(),
            name,
            email,
          };
          set({ user: newUser, authModalOpen: false, authModalMode: null });
          get().addToast(`Welcome to SparkleTask, ${name}! ✨`, 'success');
          return true;
        }
        get().addToast('Please fill in all fields', 'error');
        return false;
      },

      logout: () => {
        set({ user: null });
        get().addToast('Logged out successfully', 'info');
      },

      openAuthModal: (mode) => {
        set({ authModalOpen: true, authModalMode: mode });
      },

      closeAuthModal: () => {
        set({ authModalOpen: false, authModalMode: null });
      },
    }),
    {
      name: 'sparkletask-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        categories: state.categories,
        filters: state.filters,
        user: state.user,
        notifications: state.notifications,
      }),
    }
  )
);
