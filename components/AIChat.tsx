"use client"
import { useState, useRef, useCallback, useEffect } from 'react';
import { useGemini } from '@/hooks/use-gemini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Loader2, GripVertical } from 'lucide-react';

export function AIChat() {
  const [inputValue, setInputValue] = useState('');
  const [dimensions, setDimensions] = useState({ width: 380, height: 500 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, error, sendMessage, clearMessages } = useGemini();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      await sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height
    });
  }, [dimensions]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;
    
    // For left-side resizing, we need to adjust width differently
    const newWidth = Math.max(380, Math.min(800, resizeStart.width - deltaX));
    const newHeight = Math.max(380, Math.min(1000, resizeStart.height + deltaY));
    
    setDimensions({ width: newWidth, height: newHeight });
  }, [isResizing, resizeStart]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add and remove event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <Card 
      ref={cardRef}
      className="relative bg-white dark:bg-background border-2 border-primary/40"
      style={{ 
        width: `${dimensions.width}px`, 
        height: `${dimensions.height}px`,
        minWidth: '380px',
        minHeight: '500px',
      }}
    >
             {/* Resize handle */}
       <div
         className="absolute bottom-0 left-0 w-4 h-4 flex items-center justify-center text-primary/60 hover:text-primary"
         onMouseDown={handleMouseDown}
         style={{ cursor: isResizing ? 'ne-resize' : 'ne-resize' }}
       >
         <GripVertical className="w-3 h-3 -rotate-45" />
       </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Bot className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 h-full flex flex-col">
        {/* Messages */}
        <div className="space-y-3 flex-1 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              Ask me anything about your todos or get help with task management!
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-2 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-primary" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div
                  className={`px-3 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="px-3 py-2 rounded-lg bg-muted flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
            {error}
          </div>
        )}

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mt-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about your todos..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>

        {/* Clear button */}
        {messages.length > 0 && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={clearMessages}
              className="text-xs"
            >
              Clear Chat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
