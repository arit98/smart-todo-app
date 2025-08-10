"use client"
import { useState } from 'react';
import { Check, Edit, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Todo, Priority } from '@/types/todo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { EditTodoForm } from './EditTodoForm';

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, updates: Partial<Todo>) => void;
  className?: string;
  style?: React.CSSProperties;
}

const priorityConfig: Record<Priority, { color: string; emoji: string; bgColor: string }> = {
  high: { color: 'text-destructive', emoji: '🔴', bgColor: 'bg-destructive/10' },
  medium: { color: 'text-warning', emoji: '🟡', bgColor: 'bg-warning/10' },
  low: { color: 'text-success', emoji: '🟢', bgColor: 'bg-success/10' },
};

export function TodoItem({ todo, onToggleStatus, onDeleteTodo, onEditTodo, className, style }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const isCompleted = todo.status === 'completed';
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !isCompleted;
  const priority = priorityConfig[todo.priority];

  const handleSaveEdit = (updates: Partial<Todo>) => {
    onEditTodo(todo.id, updates);
    setIsEditing(false);
  };

  return (
    <>
      <Card 
        className={`group hover:shadow-elegant transition-all duration-300 border-0 ${
          isCompleted ? 'opacity-75 bg-muted/50' : 'bg-gradient-card shadow-card'
        } ${className}`}
        style={style}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={() => onToggleStatus(todo.id)}
              className="mt-1 data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className={`text-sm mt-1 ${isCompleted ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                      {todo.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteTodo(todo.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <Badge variant="outline" className={`${priority.bgColor} ${priority.color} border-transparent`}>
                  {priority.emoji} {todo.priority}
                </Badge>
                
                <Badge variant="outline" className="bg-primary/10 text-primary border-transparent">
                  <Tag className="h-3 w-3 mr-1" />
                  {todo.category}
                </Badge>
                
                {todo.dueDate && (
                  <Badge 
                    variant="outline" 
                    className={`border-transparent ${
                      isOverdue 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isOverdue && <AlertCircle className="h-3 w-3 mr-1" />}
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </Badge>
                )}
                
                {isCompleted && todo.completedAt && (
                  <Badge variant="outline" className="bg-success/10 text-success border-transparent">
                    <Check className="h-3 w-3 mr-1" />
                    Completed {new Date(todo.completedAt).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTodoForm
        todo={todo}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveEdit}
      />
    </>
  );
}