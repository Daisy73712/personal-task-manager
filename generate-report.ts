import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  PageBreak,
  BulletLevel,
} from 'docx';
import * as fs from 'fs';

const pinkColor = 'EC4899';
const purpleColor = 'A855F7';
const blueColor = '3B82F6';

function createHeading(text: string, level: HeadingLevel) {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 200, after: 200 },
  });
}

function createParagraph(text: string, options: { bold?: boolean; color?: string; size?: number } = {}) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: options.bold,
        color: options.color,
        size: options.size ? options.size * 2 : undefined,
      }),
    ],
    spacing: { after: 120 },
  });
}

function createBullet(text: string) {
  return new Paragraph({
    text,
    bullet: { level: 0 as BulletLevel },
    spacing: { after: 60 },
  });
}

function createTable(headers: string[], rows: string[][]) {
  const tableRows = [
    new TableRow({
      children: headers.map(
        (h) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: h, bold: true, color: 'FFFFFF' })],
                alignment: AlignmentType.CENTER,
              }),
            ],
            shading: { fill: pinkColor },
            width: { size: 20, type: WidthType.PERCENTAGE },
          })
      ),
    }),
    ...rows.map(
      (row) =>
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [new Paragraph(cell)],
                width: { size: 20, type: WidthType.PERCENTAGE },
              })
          ),
        })
    ),
  ];

  return new Table({
    rows: tableRows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'FCE7F3' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'FCE7F3' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'FCE7F3' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'FCE7F3' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'FCE7F3' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'FCE7F3' },
    },
  });
}

function createCodeBlock(code: string) {
  return new Paragraph({
    children: [
      new TextRun({
        text: code,
        font: 'Consolas',
        size: 18,
      }),
    ],
    shading: { fill: 'FDF2F8' },
    spacing: { after: 120 },
    indent: { left: 200 },
  });
}

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        // Title Page
        new Paragraph({
          children: [
            new TextRun({
              text: '✨ SparkleTask ✨',
              bold: true,
              size: 72,
              color: pinkColor,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 2000, after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Personal Task Manager with Calendar Integration',
              size: 32,
              color: purpleColor,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Project Report',
              size: 28,
              color: blueColor,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: '🌸 A Girlie Colorful Productivity Tool 🌸',
              size: 24,
              italics: true,
              color: 'F472B6',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 1000 },
        }),

        // Table of Contents
        createHeading('Table of Contents', HeadingLevel.HEADING_1),
        createParagraph('1. Project Overview'),
        createParagraph('2. Features'),
        createParagraph('3. Class Diagram'),
        createParagraph('4. Use Case Diagram'),
        createParagraph('5. ER Diagram'),
        createParagraph('6. Database Tables'),
        createParagraph('7. Technology Stack'),
        createParagraph('8. Architecture'),

        new Paragraph({ children: [new PageBreak()] }),

        // 1. Project Overview
        createHeading('1. Project Overview', HeadingLevel.HEADING_1),
        createParagraph(
          'SparkleTask is a vibrant, girlie-themed personal task manager that turns boring to-do lists into a delightful experience. With a playful pastel aesthetic, calendar integration, and satisfying interactions, staying organized has never been this cute!'
        ),
        createParagraph(
          'The application solves the problem of mundane task management by injecting joy and personality into daily productivity. It targets users who want a fun, visually appealing way to organize tasks, deadlines, and schedules, creating an emotional connection through delightful design that makes productivity feel rewarding and fun.'
        ),

        // 2. Features
        createHeading('2. Features', HeadingLevel.HEADING_1),
        
        createHeading('2.1 Task Management', HeadingLevel.HEADING_2),
        createBullet('Create, edit, and delete tasks with title and description'),
        createBullet('Set priority levels (High, Medium, Low) with color coding'),
        createBullet('Categorize tasks (Work, Personal, Study, Self-Care, Health, Finance, Social)'),
        createBullet('Set due dates and times for tasks'),
        createBullet('Mark tasks as completed with confetti celebration'),
        createBullet('Quick add bar for fast task creation'),

        createHeading('2.2 Calendar View', HeadingLevel.HEADING_2),
        createBullet('Monthly calendar view with task chips'),
        createBullet('Weekly calendar view with hourly breakdown'),
        createBullet('Daily detailed view of tasks'),
        createBullet('Drag-and-drop to reschedule tasks'),
        createBullet('Color-coded tasks by category'),
        createBullet('Click any day to add a new task'),

        createHeading('2.3 Notifications', HeadingLevel.HEADING_2),
        createBullet('In-app popup reminders 15 minutes before due time'),
        createBullet('Notification panel with read/unread tracking'),
        createBullet('Browser notification support'),
        createBullet('Mark all notifications as read'),
        createBullet('Clear all notifications'),

        createHeading('2.4 Search & Filter', HeadingLevel.HEADING_2),
        createBullet('Search tasks by keyword (title and description)'),
        createBullet('Filter by category with colorful pills'),
        createBullet('Filter by priority level'),
        createBullet('Filter by completion status (all, active, completed)'),
        createBullet('Filter by date range'),

        createHeading('2.5 User Authentication', HeadingLevel.HEADING_2),
        createBullet('User login with email and password'),
        createBullet('User sign up with name, email, and password'),
        createBullet('Demo account for quick testing'),
        createBullet('Guest mode for quick access'),
        createBullet('User profile menu with settings'),

        createHeading('2.6 Data Persistence', HeadingLevel.HEADING_2),
        createBullet('LocalStorage for data storage'),
        createBullet('Auto-save on all changes'),
        createBullet('Persistent across browser sessions'),
        createBullet('Pre-populated with sample tasks'),

        new Paragraph({ children: [new PageBreak()] }),

        // 3. Class Diagram
        createHeading('3. Class Diagram', HeadingLevel.HEADING_1),
        createParagraph(
          'The following class diagram shows the main entities and their relationships in the SparkleTask application:'
        ),
        createParagraph(''),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph('            SPARKLETASK CLASS DIAGRAM', { bold: true, color: purpleColor }),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph(''),

        // Task class
        createParagraph('┌─────────────────────────────────────────────────┐', { color: blueColor }),
        createParagraph('│                    Task                         │', { bold: true, color: pinkColor }),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  - id: string (PK)                              │'),
        createParagraph('│  - title: string                                │'),
        createParagraph('│  - description: string                          │'),
        createParagraph('│  - priority: Priority (high/medium/low)         │'),
        createParagraph('│  - categoryId: string (FK -> Category)         │'),
        createParagraph('│  - dueDate: DateTime                            │'),
        createParagraph('│  - completed: boolean                           │'),
        createParagraph('│  - createdAt: DateTime                          │'),
        createParagraph('│  - updatedAt: DateTime                          │'),
        createParagraph('│  - reminderSent: boolean                        │'),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  + toggleComplete(): void                       │'),
        createParagraph('│  + updateDueDate(date: Date): void              │'),
        createParagraph('└─────────────────────────────────────────────────┘', { color: blueColor }),
        createParagraph(''),

        // Category class
        createParagraph('┌─────────────────────────────────────────────────┐', { color: blueColor }),
        createParagraph('│                  Category                       │', { bold: true, color: purpleColor }),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  - id: string (PK)                              │'),
        createParagraph('│  - name: string                                 │'),
        createParagraph('│  - color: string (hex)                          │'),
        createParagraph('│  - emoji: string                                │'),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  + getTasks(): Task[]                           │'),
        createParagraph('└─────────────────────────────────────────────────┘', { color: blueColor }),
        createParagraph(''),

        // User class
        createParagraph('┌─────────────────────────────────────────────────┐', { color: blueColor }),
        createParagraph('│                    User                         │', { bold: true, color: '22C55E' }),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  - id: string (PK)                              │'),
        createParagraph('│  - name: string                                 │'),
        createParagraph('│  - email: string                                │'),
        createParagraph('│  - avatar: string (optional)                    │'),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  + login(email, password): boolean              │'),
        createParagraph('│  + signup(name, email, password): boolean       │'),
        createParagraph('│  + logout(): void                               │'),
        createParagraph('└─────────────────────────────────────────────────┘', { color: blueColor }),
        createParagraph(''),

        // Notification class
        createParagraph('┌─────────────────────────────────────────────────┐', { color: blueColor }),
        createParagraph('│                Notification                     │', { bold: true, color: 'F59E0B' }),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  - id: string (PK)                              │'),
        createParagraph('│  - title: string                                │'),
        createParagraph('│  - message: string                              │'),
        createParagraph('│  - type: NotificationType                       │'),
        createParagraph('│  - read: boolean                                │'),
        createParagraph('│  - createdAt: DateTime                          │'),
        createParagraph('│  - taskId: string (FK -> Task, optional)        │'),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  + markAsRead(): void                           │'),
        createParagraph('└─────────────────────────────────────────────────┘', { color: blueColor }),
        createParagraph(''),

        // TaskStore class
        createParagraph('┌─────────────────────────────────────────────────┐', { color: blueColor }),
        createParagraph('│                 TaskStore                       │', { bold: true, color: '8B5CF6' }),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  - tasks: Task[]                                │'),
        createParagraph('│  - categories: Category[]                       │'),
        createParagraph('│  - user: User | null                            │'),
        createParagraph('│  - notifications: Notification[]                │'),
        createParagraph('│  - filters: TaskFilters                         │'),
        createParagraph('│  - calendarView: CalendarView                   │'),
        createParagraph('├─────────────────────────────────────────────────┤', { color: blueColor }),
        createParagraph('│  + addTask(taskData): void                      │'),
        createParagraph('│  + updateTask(id, updates): void                │'),
        createParagraph('│  + deleteTask(id): void                         │'),
        createParagraph('│  + toggleComplete(id): void                     │'),
        createParagraph('│  + getFilteredTasks(): Task[]                   │'),
        createParagraph('│  + getTasksByDate(date): Task[]                 │'),
        createParagraph('│  + addNotification(data): void                  │'),
        createParagraph('│  + login(email, password): boolean              │'),
        createParagraph('│  + signup(name, email, password): boolean       │'),
        createParagraph('│  + logout(): void                               │'),
        createParagraph('└─────────────────────────────────────────────────┘', { color: blueColor }),
        createParagraph(''),

        // Relationships
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph('                RELATIONSHIPS', { bold: true, color: purpleColor }),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph(''),
        createParagraph('  Category 1 ──── * Task (one-to-many)'),
        createParagraph('  User 1 ──── * Task (one-to-many)'),
        createParagraph('  User 1 ──── * Notification (one-to-many)'),
        createParagraph('  Task 1 ──── 0..1 Notification (one-to-zero/one)'),
        createParagraph('  TaskStore *─── 1 Task (manages)'),
        createParagraph('  TaskStore *─── 1 Category (manages)'),
        createParagraph('  TaskStore *─── 1 User (manages)'),
        createParagraph('  TaskStore *─── 1 Notification (manages)'),

        new Paragraph({ children: [new PageBreak()] }),

        // 4. Use Case Diagram
        createHeading('4. Use Case Diagram', HeadingLevel.HEADING_1),
        createParagraph(
          'The following use case diagram shows the interactions between the user and the SparkleTask system:'
        ),
        createParagraph(''),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph('               USE CASE DIAGRAM', { bold: true, color: purpleColor }),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph(''),

        // Actor
        createParagraph('                    👩'),
        createParagraph('                  User', { bold: true }),
        createParagraph('                   │'),
        createParagraph('         ┌─────────┴─────────┐'),
        createParagraph('         │                   │'),
        createParagraph('    ┌────▼────┐        ┌────▼────┐'),
        createParagraph('    │  Guest  │        │ Logged  │'),
        createParagraph('    │  User   │        │  User   │'),
        createParagraph('    └────┬────┘        └────┬────┘'),
        createParagraph('         │                   │'),
        createParagraph('  ┌──────┴───────┐    ┌──────┴────────────┐'),
        createParagraph('  │              │    │                   │'),
        createParagraph('  ▼              ▼    ▼                   ▼'),

        createParagraph(''),
        createParagraph('╔═══════════════╗  ╔═══════════════╗  ╔═══════════════╗', { color: blueColor }),
        createParagraph('║  View Tasks   ║  ║  Create Task  ║  ║  Manage       ║', { color: purpleColor }),
        createParagraph('║  & Calendar   ║  ║               ║  ║  Profile      ║', { color: purpleColor }),
        createParagraph('╚═══════════════╝  ╚═══════════════╝  ╚═══════════════╝', { color: blueColor }),

        createParagraph(''),
        createParagraph('╔═══════════════╗  ╔═══════════════╗  ╔═══════════════╗', { color: blueColor }),
        createParagraph('║  Edit Task    ║  ║  Delete Task  ║  ║  Complete     ║', { color: purpleColor }),
        createParagraph('║               ║  ║               ║  ║  Task         ║', { color: purpleColor }),
        createParagraph('╚═══════════════╝  ╚═══════════════╝  ╚═══════════════╝', { color: blueColor }),

        createParagraph(''),
        createParagraph('╔═══════════════╗  ╔═══════════════╗  ╔═══════════════╗', { color: blueColor }),
        createParagraph('║  Search &     ║  ║  Filter Tasks ║  ║  Drag &       ║', { color: purpleColor }),
        createParagraph('║  Filter Tasks ║  ║  by Category  ║  ║  Drop Tasks   ║', { color: purpleColor }),
        createParagraph('╚═══════════════╝  ╚═══════════════╝  ╚═══════════════╝', { color: blueColor }),

        createParagraph(''),
        createParagraph('╔═══════════════╗  ╔═══════════════╗  ╔═══════════════╗', { color: blueColor }),
        createParagraph('║  Calendar     ║  ║  View         ║  ║  Login /      ║', { color: purpleColor }),
        createParagraph('║  Views        ║  ║  Notifications║  ║  Sign Up      ║', { color: purpleColor }),
        createParagraph('╚═══════════════╝  ╚═══════════════╝  ╚═══════════════╝', { color: blueColor }),

        createParagraph(''),
        createParagraph(''),
        createHeading('4.1 Use Case Descriptions', HeadingLevel.HEADING_2),

        createTable(
          ['Use Case', 'Actor', 'Description', 'Precondition', 'Postcondition'],
          [
            ['Create Task', 'User', 'Create a new task with title, description, priority, category, and due date', 'User is on dashboard or calendar', 'New task is added to the list and saved'],
            ['Edit Task', 'User', 'Modify existing task details', 'Task exists', 'Task is updated with new information'],
            ['Delete Task', 'User', 'Remove a task from the list', 'Task exists', 'Task is removed from the list'],
            ['Complete Task', 'User', 'Mark a task as completed', 'Task is active', 'Task is marked complete, confetti animation plays'],
            ['View Calendar', 'User', 'View tasks in month/week/day view', 'None', 'Calendar is displayed with tasks'],
            ['Drag & Drop', 'User', 'Reschedule tasks by dragging on calendar', 'Calendar view is open', 'Task due date is updated'],
            ['Search Tasks', 'User', 'Find tasks by keyword', 'None', 'Filtered task list is shown'],
            ['Filter Tasks', 'User', 'Filter by category, priority, status, date', 'None', 'Filtered task list is shown'],
            ['View Notifications', 'User', 'See list of notifications', 'None', 'Notification panel opens'],
            ['Login', 'User', 'Sign in with email and password', 'User has an account', 'User is logged in'],
            ['Sign Up', 'User', 'Create a new account', 'None', 'New user account is created'],
            ['Logout', 'User', 'Sign out of the application', 'User is logged in', 'User is logged out'],
          ]
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // 5. ER Diagram
        createHeading('5. ER Diagram', HeadingLevel.HEADING_1),
        createParagraph(
          'The following Entity-Relationship diagram shows the database structure for SparkleTask:'
        ),
        createParagraph(''),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph('                  ER DIAGRAM', { bold: true, color: purpleColor }),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph(''),

        // User entity
        createParagraph('    ┌──────────────────────────────────────┐', { color: blueColor }),
        createParagraph('    │              USERS                   │', { bold: true, color: pinkColor }),
        createParagraph('    ├──────────────────────────────────────┤', { color: blueColor }),
        createParagraph('    │  PK  id          : string            │'),
        createParagraph('    │      name        : string            │'),
        createParagraph('    │      email       : string (unique)   │'),
        createParagraph('    │      avatar      : string (nullable) │'),
        createParagraph('    │      createdAt   : DateTime          │'),
        createParagraph('    └───────────────┬──────────────────────┘', { color: blueColor }),
        createParagraph('                    │ 1'),
        createParagraph('                    │'),
        createParagraph('                    │ *'),

        createParagraph(''),
        // Task entity
        createParagraph('    ┌───────────────▼──────────────────────┐', { color: blueColor }),
        createParagraph('    │              TASKS                   │', { bold: true, color: purpleColor }),
        createParagraph('    ├──────────────────────────────────────┤', { color: blueColor }),
        createParagraph('    │  PK  id          : string            │'),
        createParagraph('    │  FK  userId      : string (nullable) │'),
        createParagraph('    │  FK  categoryId  : string            │'),
        createParagraph('    │      title       : string            │'),
        createParagraph('    │      description : text              │'),
        createParagraph('    │      priority    : enum              │'),
        createParagraph('    │      dueDate     : DateTime          │'),
        createParagraph('    │      completed   : boolean           │'),
        createParagraph('    │      createdAt   : DateTime          │'),
        createParagraph('    │      updatedAt   : DateTime          │'),
        createParagraph('    │      reminderSent: boolean           │'),
        createParagraph('    └───────────────┬──────────────────────┘', { color: blueColor }),
        createParagraph('                    │ *'),
        createParagraph('                    │'),
        createParagraph('                    │ 1'),

        createParagraph(''),
        // Category entity
        createParagraph('    ┌───────────────▼──────────────────────┐', { color: blueColor }),
        createParagraph('    │            CATEGORIES                │', { bold: true, color: '22C55E' }),
        createParagraph('    ├──────────────────────────────────────┤', { color: blueColor }),
        createParagraph('    │  PK  id          : string            │'),
        createParagraph('    │      name        : string            │'),
        createParagraph('    │      color       : string            │'),
        createParagraph('    │      emoji       : string            │'),
        createParagraph('    └──────────────────────────────────────┘', { color: blueColor }),

        createParagraph(''),
        createParagraph(''),
        // Notification entity
        createParagraph('    ┌──────────────────────────────────────┐', { color: blueColor }),
        createParagraph('    │          NOTIFICATIONS               │', { bold: true, color: 'F59E0B' }),
        createParagraph('    ├──────────────────────────────────────┤', { color: blueColor }),
        createParagraph('    │  PK  id          : string            │'),
        createParagraph('    │  FK  userId      : string (nullable) │'),
        createParagraph('    │  FK  taskId      : string (nullable) │'),
        createParagraph('    │      title       : string            │'),
        createParagraph('    │      message     : text              │'),
        createParagraph('    │      type        : enum              │'),
        createParagraph('    │      read        : boolean           │'),
        createParagraph('    │      createdAt   : DateTime          │'),
        createParagraph('    └──────────────────────────────────────┘', { color: blueColor }),

        createParagraph(''),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph('              RELATIONSHIP CARDINALITY', { bold: true, color: purpleColor }),
        createParagraph('═══════════════════════════════════════════════════', { color: pinkColor }),
        createParagraph(''),
        createParagraph('  User (1) ──── (*) Task          : One-to-Many'),
        createParagraph('  Category (1) ──── (*) Task      : One-to-Many'),
        createParagraph('  User (1) ──── (*) Notification  : One-to-Many'),
        createParagraph('  Task (1) ──── (0..*) Notification : One-to-Zero-or-Many'),

        new Paragraph({ children: [new PageBreak()] }),

        // 6. Database Tables
        createHeading('6. Database Tables', HeadingLevel.HEADING_1),
        createParagraph(
          'The following tables are required for the SparkleTask application. Currently using LocalStorage for persistence, but these tables represent the full database schema.'
        ),

        // 6.1 Users Table
        createHeading('6.1 Users Table', HeadingLevel.HEADING_2),
        createTable(
          ['Column Name', 'Data Type', 'Constraints', 'Description'],
          [
            ['id', 'VARCHAR(36)', 'PRIMARY KEY', 'Unique identifier for the user'],
            ['name', 'VARCHAR(100)', 'NOT NULL', 'User display name'],
            ['email', 'VARCHAR(255)', 'NOT NULL, UNIQUE', 'User email address'],
            ['avatar', 'VARCHAR(500)', 'NULL', 'URL to user avatar image'],
            ['createdAt', 'DATETIME', 'NOT NULL, DEFAULT NOW()', 'Account creation timestamp'],
            ['updatedAt', 'DATETIME', 'NOT NULL, DEFAULT NOW()', 'Last update timestamp'],
          ]
        ),

        createParagraph(''),
        createParagraph('SQL DDL:', { bold: true, color: purpleColor }),
        createCodeBlock(`CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  avatar VARCHAR(500) NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`),

        // 6.2 Categories Table
        createHeading('6.2 Categories Table', HeadingLevel.HEADING_2),
        createTable(
          ['Column Name', 'Data Type', 'Constraints', 'Description'],
          [
            ['id', 'VARCHAR(36)', 'PRIMARY KEY', 'Unique identifier for the category'],
            ['name', 'VARCHAR(50)', 'NOT NULL', 'Category name (Work, Personal, etc.)'],
            ['color', 'VARCHAR(7)', 'NOT NULL', 'Hex color code for the category'],
            ['emoji', 'VARCHAR(10)', 'NOT NULL', 'Emoji icon for the category'],
          ]
        ),

        createParagraph(''),
        createParagraph('SQL DDL:', { bold: true, color: purpleColor }),
        createCodeBlock(`CREATE TABLE categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7) NOT NULL,
  emoji VARCHAR(10) NOT NULL
);

-- Default categories
INSERT INTO categories (id, name, color, emoji) VALUES
  ('work', 'Work', '#3b82f6', '💼'),
  ('personal', 'Personal', '#ec4899', '🌸'),
  ('study', 'Study', '#a855f7', '📚'),
  ('selfcare', 'Self-Care', '#fb7185', '💖'),
  ('health', 'Health', '#22c55e', '🌿'),
  ('finance', 'Finance', '#f59e0b', '💰'),
  ('social', 'Social', '#f472b6', '🎀');`),

        // 6.3 Tasks Table
        createHeading('6.3 Tasks Table', HeadingLevel.HEADING_2),
        createTable(
          ['Column Name', 'Data Type', 'Constraints', 'Description'],
          [
            ['id', 'VARCHAR(36)', 'PRIMARY KEY', 'Unique identifier for the task'],
            ['userId', 'VARCHAR(36)', 'FOREIGN KEY, NULL', 'Reference to user (optional)'],
            ['categoryId', 'VARCHAR(36)', 'FOREIGN KEY, NOT NULL', 'Reference to category'],
            ['title', 'VARCHAR(200)', 'NOT NULL', 'Task title'],
            ['description', 'TEXT', 'NULL', 'Task description'],
            ['priority', "ENUM('high','medium','low')", 'NOT NULL, DEFAULT \'medium\'', 'Priority level'],
            ['dueDate', 'DATETIME', 'NOT NULL', 'Due date and time'],
            ['completed', 'BOOLEAN', 'NOT NULL, DEFAULT FALSE', 'Completion status'],
            ['createdAt', 'DATETIME', 'NOT NULL, DEFAULT NOW()', 'Creation timestamp'],
            ['updatedAt', 'DATETIME', 'NOT NULL, DEFAULT NOW()', 'Last update timestamp'],
            ['reminderSent', 'BOOLEAN', 'NOT NULL, DEFAULT FALSE', 'Whether reminder was sent'],
          ]
        ),

        createParagraph(''),
        createParagraph('SQL DDL:', { bold: true, color: purpleColor }),
        createCodeBlock(`CREATE TABLE tasks (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NULL,
  categoryId VARCHAR(36) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NULL,
  priority ENUM('high', 'medium', 'low') NOT NULL DEFAULT 'medium',
  dueDate DATETIME NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  reminderSent BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE INDEX idx_tasks_userId ON tasks(userId);
CREATE INDEX idx_tasks_categoryId ON tasks(categoryId);
CREATE INDEX idx_tasks_dueDate ON tasks(dueDate);
CREATE INDEX idx_tasks_completed ON tasks(completed);`),

        // 6.4 Notifications Table
        createHeading('6.4 Notifications Table', HeadingLevel.HEADING_2),
        createTable(
          ['Column Name', 'Data Type', 'Constraints', 'Description'],
          [
            ['id', 'VARCHAR(36)', 'PRIMARY KEY', 'Unique identifier for notification'],
            ['userId', 'VARCHAR(36)', 'FOREIGN KEY, NULL', 'Reference to user (optional)'],
            ['taskId', 'VARCHAR(36)', 'FOREIGN KEY, NULL', 'Related task (optional)'],
            ['title', 'VARCHAR(200)', 'NOT NULL', 'Notification title'],
            ['message', 'TEXT', 'NOT NULL', 'Notification message body'],
            ['type', "ENUM('reminder','info','success','warning')", 'NOT NULL', 'Notification type'],
            ['read', 'BOOLEAN', 'NOT NULL, DEFAULT FALSE', 'Read status'],
            ['createdAt', 'DATETIME', 'NOT NULL, DEFAULT NOW()', 'Creation timestamp'],
          ]
        ),

        createParagraph(''),
        createParagraph('SQL DDL:', { bold: true, color: purpleColor }),
        createCodeBlock(`CREATE TABLE notifications (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NULL,
  taskId VARCHAR(36) NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('reminder', 'info', 'success', 'warning') NOT NULL,
  \`read\` BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE SET NULL
);

CREATE INDEX idx_notifications_userId ON notifications(userId);
CREATE INDEX idx_notifications_taskId ON notifications(taskId);
CREATE INDEX idx_notifications_read ON notifications(\`read\`);`),

        // 6.5 Settings Table (optional)
        createHeading('6.5 Settings Table (Optional)', HeadingLevel.HEADING_2),
        createTable(
          ['Column Name', 'Data Type', 'Constraints', 'Description'],
          [
            ['id', 'VARCHAR(36)', 'PRIMARY KEY', 'Unique identifier'],
            ['userId', 'VARCHAR(36)', 'FOREIGN KEY, UNIQUE', 'Reference to user'],
            ['remindersEnabled', 'BOOLEAN', 'NOT NULL, DEFAULT TRUE', 'Enable/disable reminders'],
            ['reminderMinutesBefore', 'INT', 'NOT NULL, DEFAULT 15', 'Minutes before due to remind'],
            ['defaultView', "ENUM('dashboard','calendar')", 'NOT NULL, DEFAULT \'dashboard\'', 'Default view on load'],
            ['calendarDefaultView', "ENUM('month','week','day')", 'NOT NULL, DEFAULT \'month\'', 'Default calendar view'],
          ]
        ),

        createParagraph(''),
        createParagraph('SQL DDL:', { bold: true, color: purpleColor }),
        createCodeBlock(`CREATE TABLE settings (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL UNIQUE,
  remindersEnabled BOOLEAN NOT NULL DEFAULT TRUE,
  reminderMinutesBefore INT NOT NULL DEFAULT 15,
  defaultView ENUM('dashboard', 'calendar') NOT NULL DEFAULT 'dashboard',
  calendarDefaultView ENUM('month', 'week', 'day') NOT NULL DEFAULT 'month',
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);`),

        new Paragraph({ children: [new PageBreak()] }),

        // 7. Technology Stack
        createHeading('7. Technology Stack', HeadingLevel.HEADING_1),
        createTable(
          ['Category', 'Technology', 'Version', 'Purpose'],
          [
            ['Frontend Framework', 'React', '18.x', 'UI component library'],
            ['Language', 'TypeScript', '5.x', 'Type safety'],
            ['Build Tool', 'Vite', '6.x', 'Fast dev server and bundler'],
            ['Styling', 'Tailwind CSS', '3.x', 'Utility-first CSS'],
            ['State Management', 'Zustand', '5.x', 'Lightweight state management'],
            ['Routing', 'React Router', '7.x', 'Client-side routing'],
            ['Icons', 'Lucide React', '0.511.x', 'Icon library'],
            ['Fonts', 'Google Fonts', '-', 'Fredoka + Poppins'],
            ['Storage', 'LocalStorage', '-', 'Client-side data persistence'],
            ['Animations', 'CSS Keyframes', '-', 'Custom animations'],
            ['Notifications', 'Browser Notifications API', '-', 'System notifications'],
            ['Drag & Drop', 'HTML5 Drag & Drop API', '-', 'Calendar rescheduling'],
          ]
        ),

        createParagraph(''),
        createHeading('8. Architecture', HeadingLevel.HEADING_1),
        createParagraph(
          'SparkleTask follows a component-based architecture with clear separation of concerns. The application is built using React with TypeScript, using Zustand for state management and Tailwind CSS for styling.'
        ),

        createHeading('8.1 Project Structure', HeadingLevel.HEADING_2),
        createCodeBlock(`src/
├── components/
│   ├── calendar/          # Calendar view components
│   ├── common/            # Reusable UI components
│   ├── dashboard/         # Dashboard page components
│   ├── layout/            # Layout components (Header, etc.)
│   ├── modals/            # Modal dialogs
│   └── notifications/     # Notification components
├── context/               # React Context (if needed)
├── data/                  # Mock data and initial data
├── hooks/                 # Custom React hooks
├── pages/                 # Page components
├── store/                 # Zustand state stores
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── App.tsx                # Root app component
├── main.tsx               # App entry point
└── index.css              # Global styles`),

        createHeading('8.2 Architecture Layers', HeadingLevel.HEADING_2),
        createBullet('Presentation Layer: React components, UI, forms, modals'),
        createBullet('State Layer: Zustand store managing application state'),
        createBullet('Logic Layer: Custom hooks, utility functions'),
        createBullet('Data Layer: LocalStorage persistence, mock data'),
        createBullet('Type Layer: TypeScript interfaces and type definitions'),

        createParagraph(''),
        new Paragraph({
          children: [
            new TextRun({
              text: '✨ End of Report ✨',
              bold: true,
              size: 32,
              color: pinkColor,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 600 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'SparkleTask - Make productivity magical! 🌸',
              italics: true,
              size: 24,
              color: purpleColor,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('Task-manager.docx', buffer);
  console.log('✅ Task-manager.docx has been created successfully!');
});
