"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { Send, User, Shield, Trash2, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendExpertMessage, deleteExpertMessage } from "@/app/actions/chat";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Message {
  _id: string;
  content: string;
  senderName: string;
  senderEmail: string;
  isAdmin: boolean;
  recipient: string;
  isPublic: boolean;
  createdAt: string;
}

interface ExpertChatProps {
  initialMessages: Message[];
  adminId: string;
}

export function ExpertChat({ initialMessages, adminId }: ExpertChatProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"public" | "private">("public");
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAdmin = (session?.user as any)?.role === 'admin';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [initialMessages, activeTab]);

  const filteredMessages = initialMessages.filter(msg => {
    if (activeTab === "public") return msg.isPublic;
    // Private logic
    if (isAdmin) {
      // Admins see private messages in this tab that are NOT public
      return !msg.isPublic;
    }
    // Users see private messages where they are sender or recipient
    return !msg.isPublic && (msg.senderEmail === session?.user?.email || msg.recipient === (session?.user as any)?.id);
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const content = input.trim();
    setInput("");

    startTransition(async () => {
      const res = await sendExpertMessage(
        content, 
        activeTab === "public",
        activeTab === "private" ? (isAdmin ? "USER" : adminId) : "ALL" 
      );

      if (!res.success) {
        toast.error(res.error || "Failed to send message");
        setInput(content);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    
    startTransition(async () => {
      const res = await deleteExpertMessage(id);
      if (res.success) {
        toast.success("Message deleted");
      } else {
        toast.error(res.error || "Failed to delete");
      }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px]">
      {/* Header / Tabs */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl w-full max-w-sm">
          <button
            onClick={() => setActiveTab("public")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === "public" ? "bg-white dark:bg-slate-800 text-sky-600 shadow-sm" : "text-slate-400"
            )}
          >
            <Globe className="w-3.5 h-3.5" />
            Public Lounge
          </button>
          <button
            onClick={() => setActiveTab("private")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === "private" ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20" : "text-slate-400"
            )}
          >
            <Lock className="w-3.5 h-3.5" />
            {isAdmin ? "User Inquiries" : "Admin Direct"}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-white dark:bg-slate-900/50"
      >
        {filteredMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
            <Send className="w-12 h-12 text-slate-300" />
            <p className="text-xs font-black uppercase tracking-[0.2em]">Start the technical dialogue...</p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isMe = msg.senderEmail === session?.user?.email;
            return (
              <div 
                key={msg._id} 
                className={cn(
                  "flex flex-col max-w-[80%] group",
                  isMe ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className="flex items-center gap-2 mb-1 px-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                    {msg.senderName} {msg.isAdmin && <span className="text-sky-500 ml-1">[ADMIN]</span>}
                  </span>
                  <span className="text-[7px] text-slate-300">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-xs font-medium shadow-sm relative",
                  isMe 
                    ? "bg-sky-600 text-white rounded-tr-none" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-200 dark:border-slate-700"
                )}>
                  {msg.content}
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(msg._id)}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg scale-75 hover:scale-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex items-center gap-4">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={activeTab === "public" ? "Broadcast to community..." : "Message registry admin..."}
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isPending}
            className="p-4 bg-[#2563EB] text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
