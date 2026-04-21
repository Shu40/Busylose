"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, FolderKanban, BarChart3, Bookmark, Settings } from "lucide-react";

export type ProfileTab = "overview" | "projects" | "analytics" | "saved" | "settings";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onChange: (tab: ProfileTab) => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "My Projects", icon: FolderKanban },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "saved", label: "Saved Tools", icon: Bookmark },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export default function ProfileTabs({ activeTab, onChange }: ProfileTabsProps) {
  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 p-1 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id as ProfileTab)}
          className={cn(
            "flex items-center gap-x-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
            activeTab === tab.id
              ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200/50 dark:border-slate-600"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/30"
          )}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
