import { Todo, Priority } from '@/types/todo';

export interface TodoData {
  title: string;
  description?: string;
  priority: Priority;
  category: string;
  dueDate?: Date;
}

/**
 * Add a new todo item to the list
 * @param todoData - The todo data to add
 * @returns Promise<Todo> - The created todo item
 */
export async function addTodoItem(todoData: TodoData): Promise<Todo> {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create todo');
    }

    const result = await response.json();
    return result.todo;
  } catch (error) {
    console.error('Error adding todo item:', error);
    throw error;
  }
}

/**
 * Get all todos from the API
 * @returns Promise<Todo[]> - Array of todos
 */
export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch('/api/todos');
    
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    const result = await response.json();
    return result.todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

/**
 * Update an existing todo item
 * @param id - The todo ID to update
 * @param updates - Partial todo data to update
 * @returns Promise<Todo> - The updated todo item
 */
export async function updateTodoItem(id: string, updates: Partial<Todo>): Promise<Todo> {
  try {
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, updates }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update todo');
    }

    const result = await response.json();
    return result.todo;
  } catch (error) {
    console.error('Error updating todo item:', error);
    throw error;
  }
}

/**
 * Delete a todo item
 * @param id - The todo ID to delete
 * @returns Promise<Todo> - The deleted todo item
 */
export async function deleteTodoItem(id: string): Promise<Todo> {
  try {
    const response = await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete todo');
    }

    const result = await response.json();
    return result.todo;
  } catch (error) {
    console.error('Error deleting todo item:', error);
    throw error;
  }
}

/**
 * Toggle the status of a todo item
 * @param id - The todo ID to toggle
 * @returns Promise<Todo> - The updated todo item
 */
export async function toggleTodoStatus(id: string): Promise<Todo> {
  try {
    // First get the current todo to check its status
    const todos = await getTodos();
    const currentTodo = todos.find(todo => todo.id === id);
    
    if (!currentTodo) {
      throw new Error('Todo not found');
    }

    const newStatus = currentTodo.status === 'completed' ? 'pending' : 'completed';
    const updates = {
      status: newStatus,
      completedAt: newStatus === 'completed' ? new Date() : undefined,
    };

    return await updateTodoItem(id, updates);
  } catch (error) {
    console.error('Error toggling todo status:', error);
    throw error;
  }
}

/**
 * Create a todo item locally (for immediate UI updates)
 * @param todoData - The todo data to create
 * @returns Todo - The created todo item
 */
export function createTodoItemLocally(todoData: TodoData): Todo {
  return {
    id: Date.now().toString(),
    title: todoData.title.trim(),
    description: todoData.description?.trim() || undefined,
    priority: todoData.priority,
    category: todoData.category,
    status: 'pending',
    createdAt: new Date(),
    dueDate: todoData.dueDate,
  };
}
