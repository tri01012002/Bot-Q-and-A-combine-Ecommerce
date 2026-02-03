"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, ShoppingBag, Bot, User } from "lucide-react";
import { ChatSidebar } from "@/components/ChatSidebar";
import clsx from "clsx";

interface ProductRecommendation {
    id: number;
    name: string;
    reason: string;
    price: number;
}

interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
    recommendations?: ProductRecommendation[];
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            sender: "bot",
            text: "Hello! I am your AI Health Assistant. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.text }),
            });

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: data.answer,
                recommendations: data.recommendations,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error); // Log error for debugging
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    sender: "bot",
                    text: "Sorry, I am having trouble connecting to the medical database.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen pt-[72px]">
            {/* Main Chat Area */}
            <div className="flex flex-1 flex-col bg-slate-950">
                <div className="flex-1 overflow-y-auto px-4 py-6 md:px-10 lg:px-20">
                    <div className="mx-auto max-w-3xl flex flex-col gap-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={clsx(
                                    "flex gap-4",
                                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                {/* Avatar */}
                                <div className={clsx(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg",
                                    msg.sender === "user"
                                        ? "from-indigo-500 to-purple-500"
                                        : "from-emerald-500 to-teal-500"
                                )}>
                                    {msg.sender === "user" ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
                                </div>

                                {/* Bubble */}
                                <div className={clsx(
                                    "flex flex-col gap-2 rounded-2xl px-6 py-4 shadow-md max-w-[80%]",
                                    msg.sender === "user"
                                        ? "bg-slate-800 text-slate-100 rounded-tr-sm"
                                        : "bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-900/30 text-slate-200 rounded-tl-sm backdrop-blur-sm"
                                )}>
                                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                                    {/* Recommendations Grid */}
                                    {msg.recommendations && msg.recommendations.length > 0 && (
                                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                            {msg.recommendations.map((rec) => (
                                                <div key={rec.id} className="group relative overflow-hidden rounded-xl bg-slate-950/50 border border-slate-800 p-3 hover:border-emerald-500/50 transition-colors cursor-pointer">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <h4 className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">{rec.name}</h4>
                                                            <p className="mt-1 text-xs text-slate-400 italic line-clamp-2">{rec.reason}</p>
                                                        </div>
                                                        <div className="rounded-full bg-emerald-500/10 p-1.5 text-emerald-500">
                                                            <ShoppingBag size={14} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-slate-900 px-6 py-4 border border-slate-800">
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-slate-800 bg-slate-950/80 p-4 backdrop-blur-md pb-8">
                    <div className="mx-auto flex max-w-3xl items-center gap-4 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 shadow-2xl focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Ask about symptoms (e.g., headache, fever)..."
                            className="flex-1 bg-transparent px-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !input.trim()}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="mt-2 text-center text-xs text-slate-600">
                        AI can make mistakes. Please consult a professional doctor.
                    </p>
                </div>
            </div>

            {/* Right Sidebar */}
            <ChatSidebar />
        </div>
    );
}
