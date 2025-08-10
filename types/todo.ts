export type Priority = 'low' | 'medium' | 'high';
export type TodoStatus = 'pending' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category: string;
  status: TodoStatus;
  createdAt: Date;
  completedAt?: Date;
  dueDate?: Date;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}