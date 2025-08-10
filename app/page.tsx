"use client"
import TodoApp from "@/components/TodoApp";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [chat, setChat] = useState<boolean>(true);
    const handleChatBox = () => {
        return setChat(!chat)
    }
    return (
        <main>
            <TodoApp />
            <div>
                <Button
                    onClick={handleChatBox}
                    className="w-12 h-12 fixed right-12 bottom-12 bg-primary/30 rounded-full hover:bg-primary hover:text-white">
                    <Bot className="h-5 w-5 dark:text-white" />
                </Button>
                {
                    chat && 
                    <div className="fixed bottom-28 right-12">
                        <AIChat />
                    </div>
                    }
            </div>
        </main>
    )
}