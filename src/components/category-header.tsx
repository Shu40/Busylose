"use client";

import { Monitor, Terminal, Globe, Smartphone, Search, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Terminal,
  Globe,
  Smartphone,
};

interface CategoryHeaderProps {
  title: string;
  description: string;
  iconName: string;
  color: "sky" | "green" | "orange" | "indigo";
  count: number;
}

export default function CategoryHeader({
  title,
  description,
  iconName,
  color,
  count,
}: CategoryHeaderProps) {
  const Icon = iconMap[iconName] || Globe;

  return (
    <div className="mb-10 space-y-2">
      <div className="flex items-center gap-x-3">
         <Icon className={cn(
             "w-8 h-8",
             color === "sky" && "text-sky-600",
             color === "green" && "text-green-600",
             color === "orange" && "text-orange-600",
             color === "indigo" && "text-indigo-600",
         )} />
         <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
      </div>
      <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl">{description}</p>
      <div className="flex items-center gap-x-2 text-xs font-semibold text-slate-400 pt-2">
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">{count} Resources</span>
          <span>•</span>
          <span>Verified Packages</span>
      </div>
    </div>
  );
}
