"use client"
import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, updates: Partial<Todo>) => void;
}

export function TodoList({ todos, onToggleStatus, onDeleteTodo, onEditTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
        <p className="text-muted-foreground">
          {todos.length === 0 ? "Add your first task to get started!" : "Try adjusting your filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleStatus={onToggleStatus}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-slide-up"
        />
      ))}
    </div>
  );
}