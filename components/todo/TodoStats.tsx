"use client"
import { CheckCircle, Clock, AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TodoStats as TodoStatsType } from '@/types/todo';

interface TodoStatsProps {
  stats: TodoStatsType;
  onClearCompleted: () => void;
}

export function TodoStats({ stats, onClearCompleted }: TodoStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: CheckCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/10 dark:bg-primary/20',
      cardBorder: 'border-primary/30'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10 dark:bg-success/20',
      cardBorder: 'border-success/30'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10 dark:bg-warning/20',
      cardBorder: 'border-warning/50 dark:border-warning/20'
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10 dark:bg-destructive/20',
      cardBorder: 'border-destructive/30'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={stat.label} className={`animate-slide-up ${stat.cardBorder} ${stat.bgColor} border-2 shadow-card hover:shadow-elegant transition-all duration-300`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary/10 dark:bg-primary/20 p-8 border-2 border-primary/30">
        <div className="flex items-center gap-4 w-48">
          <div className="text-sm text-muted-foreground">
            Completion Rate: <span className="font-semibold text-foreground">{completionRate}%</span>
          </div>
          <div className="w-full h-2 bg-muted dark:bg-primary/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {stats.completed > 0 && (
          <Button
            onClick={onClearCompleted}
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear Completed ({stats.completed})
          </Button>
        )}
      </Card>
    </div>
  );
}