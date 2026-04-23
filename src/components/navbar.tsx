"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./theme-provider";
import { 
  ShieldCheck, 
  Sun, 
  Moon, 
  Terminal, 
  User as UserIcon, 
  ChevronDown, 
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/windows" },
    { label: "Expert", href: "/expert" },
    { label: "Support", href: "/support" }
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center gap-x-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl">
              <Image 
                src="/logo.png"
                alt="BusyLoss Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">BUSYLOSS</span>
              <div className="flex items-center gap-x-1 mt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Secure Platform</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm font-bold text-slate-500 hover:text-[#2563EB] dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-x-4">
          {/* Theme Switcher */}
          <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button onClick={() => setTheme('light')} title="Daylight Mode" className={cn("p-2 rounded-lg transition-all", theme === 'light' ? "bg-white dark:bg-slate-700 text-amber-500 shadow-sm" : "text-slate-400")}>
              <Sun className="w-4 h-4" />
            </button>
            <button onClick={() => setTheme('dark')} title="Midnight Mode" className={cn("p-2 rounded-lg transition-all", theme === 'dark' ? "bg-white dark:bg-slate-700 text-indigo-500 shadow-sm" : "text-slate-400")}>
              <Moon className="w-4 h-4" />
            </button>
            <button onClick={() => setTheme('hacker')} title="Hacker Cyber Mode" className={cn("p-2 rounded-lg transition-all", theme === 'hacker' ? "bg-white dark:bg-slate-700 text-emerald-500 shadow-sm" : "text-slate-400")}>
              <Terminal className="w-4 h-4" />
            </button>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden md:block" />

          {session ? (
            <div className="flex items-center gap-x-4">
              <Link href="/contribute" className="hidden sm:flex items-center gap-x-2 px-6 py-2.5 bg-[#2563EB] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                <PlusCircle className="w-4 h-4" />
                Contribute
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-x-2.5 p-1 pr-3 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", profileOpen && "rotate-180")} />
                </button>

                {profileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 animate-in fade-in zoom-in-95">
                    <Link href="/dashboard" className="flex items-center gap-x-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors border-b border-slate-50 dark:border-slate-800 mb-1">
                      <UserIcon className="w-4 h-4 text-sky-500" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">View Profile</span>
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Dashboard Access</span>
                      </div>
                    </Link>
                    <button onClick={() => signOut()} className="w-full flex items-center gap-x-3 p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-red-500">
                      <LogOut className="w-4 h-4" />
                      <span className="text-xs font-bold">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-x-3">
              <Link href="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 px-6 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Sign In</Link>
              <Link href="/signup" className="text-sm font-bold bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-6 py-2.5 rounded-xl hover:scale-105 transition-all shadow-xl">Join Now</Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
              {link.label}
            </Link>
          ))}
          
          {!session && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/login" className="flex items-center justify-center px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 transition-all">Sign In</Link>
              <Link href="/signup" className="flex items-center justify-center px-4 py-3 text-xs font-black uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl transition-all">Join Now</Link>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between px-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 capitalize">{theme} mode active</span>
            <div className="flex gap-2">
              <button onClick={() => setTheme('light')} className={cn("p-2 rounded-lg", theme === 'light' ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400")}><Sun className="w-4 h-4" /></button>
              <button onClick={() => setTheme('dark')} className={cn("p-2 rounded-lg", theme === 'dark' ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400")}><Moon className="w-4 h-4" /></button>
              <button onClick={() => setTheme('hacker')} className={cn("p-2 rounded-lg", theme === 'hacker' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400")}><Terminal className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
