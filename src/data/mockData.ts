import { Category, Task } from '@/types';

export const defaultCategories: Category[] = [
  { id: 'work', name: 'Work', color: '#3b82f6', emoji: '💼' },
  { id: 'personal', name: 'Personal', color: '#ec4899', emoji: '🌸' },
  { id: 'study', name: 'Study', color: '#a855f7', emoji: '📚' },
  { id: 'selfcare', name: 'Self-Care', color: '#fb7185', emoji: '💖' },
  { id: 'health', name: 'Health', color: '#22c55e', emoji: '🌿' },
  { id: 'finance', name: 'Finance', color: '#f59e0b', emoji: '💰' },
  { id: 'social', name: 'Social', color: '#f472b6', emoji: '🎀' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const dayAfter = new Date(today);
dayAfter.setDate(dayAfter.getDate() + 2);

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Finish project presentation',
    description: 'Prepare slides and notes for the big meeting tomorrow',
    priority: 'high',
    categoryId: 'work',
    dueDate: tomorrow.toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Morning yoga session',
    description: '30 minutes of gentle stretching and meditation',
    priority: 'medium',
    categoryId: 'health',
    dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0).toISOString(),
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Study React hooks',
    description: 'Review useEffect and useCallback patterns',
    priority: 'medium',
    categoryId: 'study',
    dueDate: dayAfter.toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Call best friend 💕',
    description: 'Catch up and plan our weekend outing',
    priority: 'low',
    categoryId: 'social',
    dueDate: tomorrow.toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Face mask self-care night',
    description: 'Relax with a face mask and my favorite show',
    priority: 'low',
    categoryId: 'selfcare',
    dueDate: today.toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Pay electricity bill',
    description: 'Don\'t forget! Due this week',
    priority: 'high',
    categoryId: 'finance',
    dueDate: nextWeek.toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Grocery shopping',
    description: 'Get fruits, veggies, and snacks for the week',
    priority: 'medium',
    categoryId: 'personal',
    dueDate: today.toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
