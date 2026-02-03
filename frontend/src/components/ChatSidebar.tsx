"use client";
import React from "react";
import { MessageSquare, Plus, Clock, ChevronRight } from "lucide-react";

export const ChatSidebar = () => {
    const history = [
        { id: 1, title: "Headache remedies", date: "Today" },
        { id: 2, title: "Flu symptoms", date: "Yesterday" },
        { id: 3, title: "Vitamin C benefits", date: "2 days ago" },
    ];

    return (
        <aside className="hidden w-80 flex-col border-l border-slate-800 bg-slate-950/50 p-4 lg:flex">
            <button className="flex w-full items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-900/20 mb-6">
                <Plus size={20} />
                New Chat
            </button>

            <div className="flex-1 overflow-y-auto pr-2">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Recent History
                </h3>
                <div className="flex flex-col gap-2">
                    {history.map((item) => (
                        <button
                            key={item.id}
                            className="group flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-slate-900"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <MessageSquare size={16} className="text-slate-400 group-hover:text-emerald-400" />
                                <div className="flex flex-col truncate">
                                    <span className="truncate text-sm font-medium text-slate-300 group-hover:text-white">
                                        {item.title}
                                    </span>
                                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                        <Clock size={10} /> {item.date}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight size={14} className="opacity-0 transition-opacity text-slate-500 group-hover:opacity-100" />
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};
