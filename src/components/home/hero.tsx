"use client";

import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/windows?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative py-20 px-4 md:px-6 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="inline-flex items-center gap-x-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-full text-xs font-black uppercase tracking-widest border border-sky-100 dark:border-sky-800">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                Community Powered Platform
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.85]">
                Empowering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">Next-Gen Builders.</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed uppercase tracking-widest transition-colors duration-200">
                The most advanced community-driven exchange for <br />
                premium source code, APKs, and professional tools.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for projects, tools, or source code..."
                    className="w-full pl-14 pr-32 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-2xl focus:border-sky-500 outline-none transition-all font-bold text-slate-800 dark:text-white placeholder:text-slate-400"
                />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                <button 
                    type="submit"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-sky-700 hover:bg-sky-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black uppercase tracking-tight transition-all active:scale-95"
                >
                    Search
                </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link 
                    href="/windows"
                    className="flex items-center gap-x-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl"
                >
                    Browse Projects
                    <ChevronRight className="w-4 h-4" />
                </Link>
                <Link 
                    href="/contribute"
                    className="flex items-center gap-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                >
                    Upload Project
                </Link>
            </div>
        </div>
    </section>
  );
}
