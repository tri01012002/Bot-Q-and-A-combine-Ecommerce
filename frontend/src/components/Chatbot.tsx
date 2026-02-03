"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface ProductRecommendation {
    id: number;
    name: string;
    reason: string;
    price: number;
    image_url?: string;
}

interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
    recommendations?: ProductRecommendation[];
}

export const Chatbot = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Hide on dedicated chat page
    if (pathname === "/chat") return null;

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            sender: "bot",
            text: "Hello! I am your Health Assistant. Ask me about symptoms or health advice.",
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
    }, [messages, isOpen]);

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
            console.error("Error sending message:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    sender: "bot",
                    text: "Sorry, I am having trouble connecting to the server.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-emerald-600 px-4 py-3 text-white">
                            <div className="flex items-center gap-2">
                                <MessageCircle size={20} />
                                <h3 className="font-semibold">Health Assistant</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 hover:bg-emerald-700 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto p-4 bg-slate-900/50">
                            <div className="flex flex-col gap-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={clsx(
                                            "flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-2 text-sm",
                                            msg.sender === "user"
                                                ? "self-end bg-emerald-600 text-white rounded-tr-none"
                                                : "self-start bg-slate-800 text-slate-200 rounded-tl-none"
                                        )}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.text}</p>

                                        {/* Recommendations */}
                                        {msg.recommendations && msg.recommendations.length > 0 && (
                                            <div className="mt-2 flex flex-col gap-2 border-t border-slate-700/50 pt-2">
                                                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                                                    <ShoppingBag size={12} /> Suggested Products:
                                                </span>
                                                {msg.recommendations.map((rec) => (
                                                    <div
                                                        key={rec.id}
                                                        className="bg-slate-950 p-2 rounded border border-slate-700/50 hover:border-emerald-500/50 transition-colors"
                                                    >
                                                        <p className="font-medium text-emerald-300">{rec.name}</p>
                                                        <p className="text-xs text-slate-400 italic">{rec.reason}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="self-start rounded-2xl rounded-tl-none bg-slate-800 px-4 py-2 text-sm text-slate-400">
                                        <span className="animate-pulse">Thinking...</span>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <div className="bg-slate-900 border-t border-slate-800 p-3">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                    placeholder="Ask about symptoms..."
                                    className="flex-1 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-slate-500"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !input.trim()}
                                    className="rounded-full bg-emerald-600 p-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 hover:scale-105 transition-all active:scale-95"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
};
