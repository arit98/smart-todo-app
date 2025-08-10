"use client"
import { Plus, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface TodoHeaderProps {
  onAddTodo: () => void;
}

export function TodoHeader({ onAddTodo }: TodoHeaderProps) {
  return (
    <div className="relative text-center space-y-6 animate-slide-up">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary rounded-xl shadow-glow">
            <CheckSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-primary">
            AI Todo
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Organize your tasks with priorities, categories, and powerful filtering. 
          Stay productive and never miss a deadline.
        </p>
      </div>
      
      <Button 
        onClick={onAddTodo}
        variant="default"
        size="lg"
        className="animate-bounce-subtle dark:text-white"
      >
        <Plus className="h-5 w-5" />
        Add New Task
      </Button>
    </div>
  );
}