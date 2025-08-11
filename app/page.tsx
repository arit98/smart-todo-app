"use client"
import TodoApp from "@/components/TodoApp";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useState } from "react";
import { CopilotPopup } from "@copilotkit/react-ui";

export default function Home() {
    const [chat, setChat] = useState<boolean>(true);
    const handleChatBox = () => {
        return setChat(!chat)
    }
    return (
        <main>
            <TodoApp />
            {/* Custom Chatbot */}
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
            {/* <CopilotPopup
                instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                labels={{
                    title: "Your Assistant",
                    initial: "Hi! 👋 How can I assist you today?",
                }}
            /> */}
        </main>
    )
}