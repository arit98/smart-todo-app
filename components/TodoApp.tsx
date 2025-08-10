"use client"
import { useState, useMemo } from 'react';
import { Todo, Priority, TodoStatus } from '@/types/todo';
import { TodoHeader } from '@/components/todo/TodoHeader';
import { TodoStats } from '@/components/todo/TodoStats';
import { TodoFilters } from '@/components/todo/TodoFilters';
import { TodoList } from '@/components/todo/TodoList';
import { AddTodoForm } from '@/components/todo/AddTodoForm';
import { useToast } from '@/hooks/use-toast';

const defaultCategories = ['Work', 'Personal', 'Shopping', 'Health', 'Learning'];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<TodoStatus | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const { toast } = useToast();

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = selectedPriority === 'all' || todo.priority === selectedPriority;
      const matchesStatus = selectedStatus === 'all' || todo.status === selectedStatus;
      const matchesCategory = selectedCategory === 'all' || todo.category === selectedCategory;

      return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
    });
  }, [todos, searchQuery, selectedPriority, selectedStatus, selectedCategory]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.status === 'completed').length;
    const pending = todos.filter(todo => todo.status === 'pending').length;
    const overdue = todos.filter(todo =>
      todo.status === 'pending' &&
      todo.dueDate &&
      new Date(todo.dueDate) < new Date()
    ).length;

    return { total, completed, pending, overdue };
  }, [todos]);

  const handleAddTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'status'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending',
    };

    setTodos(prev => [newTodo, ...prev]);
    setIsAddFormOpen(false);
    toast({
      title: "Task added!",
      description: "Your new task has been successfully created.",
    });
  };

  const handleToggleStatus = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? {
          ...todo,
          status: todo.status === 'completed' ? 'pending' : 'completed',
          completedAt: todo.status === 'pending' ? new Date() : undefined
        }
        : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
      variant: "destructive",
    });
  };

  const handleEditTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.status === 'completed').length;
    setTodos(prev => prev.filter(todo => todo.status !== 'completed'));
    toast({
      title: `${completedCount} completed tasks cleared`,
      description: "Your completed tasks have been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
        <TodoHeader onAddTodo={() => setIsAddFormOpen(true)} />

        <TodoStats stats={stats} onClearCompleted={clearCompleted} />

        <TodoFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={defaultCategories}
        />

        <TodoList
          todos={filteredTodos}
          onToggleStatus={handleToggleStatus}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
        />

        <AddTodoForm
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          onSubmit={handleAddTodo}
          categories={defaultCategories}
        />
      </div>
    </div>
  );
}