"use client";

import { useState } from "react";
import ProfileTabs, { ProfileTab } from "./profile-tabs";
import ProfileOverview from "./profile-overview";
import MyProjects from "./my-projects";
import ProfileAnalytics from "./profile-analytics";
import SavedTools from "./saved-tools";
import ProfileSettings from "./profile-settings";
import { User as UserIcon, LogOut, ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface DashboardPanelProps {
  user: any;
  submissions: any[];
  savedTools: any[];
  analytics: any;
  creatorStats: any[];
}

export default function DashboardPanel({ user, submissions, savedTools, analytics, creatorStats }: DashboardPanelProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  const stats = {
    uploads: submissions.length,
    downloads: submissions.reduce((acc, s) => acc + (s.downloads || 0), 0),
    views: submissions.reduce((acc, s) => acc + (s.views || 0), 0),
    rank: user.role === 'admin' ? "Founder" : "Creator",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="flex items-center gap-x-8">
            <div className="relative group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-sky-400 to-indigo-600 p-1 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                    <div className="w-full h-full rounded-[2.2rem] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                        <UserIcon className="w-16 h-16 text-slate-200 dark:text-slate-700" />
                    </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white dark:border-slate-950 rounded-full shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
            </div>
            
            <div>
                <div className="flex items-center gap-x-3 mb-2">
                    <span className="px-3 py-1 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-sky-100 dark:border-sky-800">
                        {user.role}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Creator Control Panel</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
                    {user.name}
                </h1>
                <div className="flex items-center gap-x-6 text-slate-500 font-bold text-sm">
                    <div className="flex items-center gap-x-2">
                        <span className="text-slate-900 dark:text-white">{stats.uploads}</span> Assets
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className="text-slate-900 dark:text-white">{stats.views}</span> Analytics
                    </div>
                </div>
            </div>
        </div>

        <button 
            onClick={() => signOut()}
            className="flex items-center gap-x-3 px-8 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-all border border-slate-200 dark:border-slate-700 shadow-sm self-start md:self-auto"
        >
            <LogOut className="w-4 h-4" />
            Terminate Session
        </button>
      </div>

      <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {activeTab === "overview" && <ProfileOverview user={user} stats={stats} />}
        {activeTab === "projects" && <MyProjects submissions={submissions} />}
        {activeTab === "analytics" && <ProfileAnalytics initialData={analytics} toolStats={creatorStats} />}
        {activeTab === "saved" && <SavedTools tools={savedTools} />}
        {activeTab === "settings" && <ProfileSettings user={user} />}
      </div>
    </div>
  );
}
