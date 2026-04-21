"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, ChevronRight } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: string[];
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  text: "Hello! I am your BusyLoss assistant. How can I help you navigate the platform today?",
  sender: "bot",
  options: [
    "How to contribute?",
    "Where is my profile?",
    "Browse Windows Software",
    "Expert Talking section"
  ]
};

export function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOptionClick = (option: string) => {
    const userMessage = { id: Date.now().toString(), text: option, sender: "user" as const };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    setTimeout(() => {
      let botResponse = "";
      let botOptions: string[] = [];

      if (option.includes("contribute")) {
        botResponse = "To contribute, click on the '+' icon in the sidebar. You'll need to be logged in to submit your tools!";
        botOptions = ["View Profile", "Go to Home"];
      } else if (option.includes("profile")) {
        botResponse = "Your profile is located in the sidebar under 'User Profile'. There you can see your stats and download certificates.";
        botOptions = ["How to contribute?", "Expert Talking"];
      } else if (option.includes("Windows")) {
        botResponse = "You can find all Windows tools in the 'Windows Software' section in the sidebar. Happy browsing!";
        botOptions = ["Android APKs", "Linux Tools"];
      } else if (option.includes("Expert")) {
        botResponse = "The Expert Talking section contains articles and guides. When your submission is approved, it also creates an article there!";
        botOptions = ["How to contribute?"];
      } else {
        botResponse = "I'm not sure about that, but you can always email us at support@busyloss.com!";
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot" as const,
        options: botOptions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-sky-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-x-2 hover:scale-105 transition-all z-50 animate-bounce"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="text-sm font-bold">Chat with Bot</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-slate-900 border rounded-3xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
      <div className="p-4 bg-sky-700 text-white flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold">BusyLoss AI Bot</p>
            <p className="text-[10px] opacity-80 font-medium">Online Helper</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.sender === 'user' 
              ? 'bg-sky-700 text-white rounded-br-none' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-none'
            }`}>
              {msg.text}
              {msg.options && msg.options.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.options.map(opt => (
                    <button 
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="px-3 py-1 bg-white dark:bg-slate-700 border border-sky-200 dark:border-sky-900 rounded-full text-[10px] font-bold text-sky-700 dark:text-sky-400 hover:bg-sky-50 transition-all flex items-center gap-x-1"
                    >
                      <ChevronRight className="w-3 h-3" />
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-slate-50 dark:bg-slate-800/50 flex gap-2">
        <input 
          placeholder="Ask me anything..." 
          className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border text-sm outline-none focus:ring-1 focus:ring-sky-500"
          onKeyPress={(e) => e.key === 'Enter' && handleOptionClick((e.target as HTMLInputElement).value)}
        />
        <button className="p-2 bg-sky-700 text-white rounded-xl">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
