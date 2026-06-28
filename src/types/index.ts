export type Priority = 'high' | 'medium' | 'low';

export interface Category {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  categoryId: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  reminderSent?: boolean;
}

export interface TaskFilters {
  search: string;
  categoryId: string | null;
  priority: Priority | null;
  status: 'all' | 'active' | 'completed';
  dateFrom: string | null;
  dateTo: string | null;
}

export type CalendarView = 'month' | 'week' | 'day';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'info' | 'success' | 'warning';
  read: boolean;
  createdAt: string;
  taskId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type AuthModalMode = 'login' | 'signup' | null;
