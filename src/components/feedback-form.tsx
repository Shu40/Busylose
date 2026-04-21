"use client";

import { useState } from "react";
import { Send, Star } from "lucide-react";

export function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-sky-50 dark:bg-sky-900/20 p-8 rounded-3xl border border-sky-200 dark:border-sky-800 text-center space-y-4 animate-in zoom-in duration-500">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-800 rounded-full flex items-center justify-center mx-auto">
          <Star className="w-8 h-8 text-sky-700" />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-sky-900 dark:text-sky-100">Thank You!</h3>
        <p className="text-sm text-sky-700 dark:text-sky-300 font-medium">Your feedback helps us make BusyLoss even better for everyone.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border shadow-xl space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-black uppercase tracking-tight">Community Feedback</h3>
        <p className="text-sm text-slate-500 font-medium">How are we doing? Let founder Shubham Kumar know your thoughts!</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder="Your Name" className="px-4 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-sky-500 transition-all text-sm font-medium" />
          <input required type="email" placeholder="Email Address" className="px-4 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-sky-500 transition-all text-sm font-medium" />
        </div>
        <textarea required rows={4} placeholder="Your message or suggestions..." className="w-full px-4 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-sky-500 transition-all text-sm font-medium resize-none"></textarea>
        <button type="submit" className="w-full bg-sky-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-sky-800 transition-all flex items-center justify-center gap-x-2">
          <Send className="w-4 h-4" />
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
