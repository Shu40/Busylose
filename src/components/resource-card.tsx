"use client";

import { Download, Eye, Star, User, Bookmark, LucideIcon, Globe, Smartphone, Monitor, Terminal, BarChart3, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackView, toggleBookmark } from "@/app/actions/profile";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import Link from "next/link";
import { incrementView, submitReview, incrementDownload } from "@/app/actions/stats";

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  category: 'Windows' | 'Linux' | 'Website' | 'Android';
  downloadLink: string;
  views: number;
  downloads: number;
  owner: string;
  uploadDate: Date;
  type: 'Free' | 'Paid' | 'Open-source';
  slug: string;
  features?: string[];
  isBookmarked?: boolean;
  rating?: number;
}

const iconMap = {
  Windows: Monitor,
  Linux: Terminal,
  Website: Globe,
  Android: Smartphone,
};

export function ResourceCard({ 
  id, 
  title, 
  description, 
  category, 
  downloadLink, 
  views, 
  downloads, 
  owner, 
  uploadDate,
  type,
  slug,
  features = [],
  isBookmarked = false,
  rating = 0
}: ResourceCardProps) {
  const [saved, setSaved] = useState(isBookmarked);
  const [showFeatures, setShowFeatures] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const Icon = iconMap[category] || Globe;

  const handleToggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await toggleBookmark(id);
    if (res.success) {
        setSaved(!saved);
        toast.success(saved ? "Removed from bookmarks" : "Saved to library");
    }
  };

  const handlePreviewDetails = () => {
    startTransition(async () => {
      await incrementView(id);
    });
    setShowFeatures(true);
  };

  const handleDownload = () => {
    startTransition(async () => {
      await incrementDownload(id);
    });
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    startTransition(async () => {
      const res = await submitReview(id, owner || "Anonymous", userRating, comment);
      if (res.success) {
        toast.success("Feedback submitted! System synced.");
        setComment("");
        setUserRating(0);
        setShowFeatures(false);
      } else {
        toast.error("System sync failed.");
      }
    });
  };
  return (
    <div className="group relative h-full">
      <div className={cn(
        "bg-[var(--card)] rounded-[2rem] border border-[var(--border)] p-5 md:p-6 transition-all duration-500 flex flex-col h-full relative",
        "hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-sky-500/30",
        "group-data-[theme=hacker]:hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] group-data-[theme=hacker]:hover:border-[var(--hacker-green)]"
      )}>
        {/* Background Blur Container */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
        </div>
        <div className="flex items-start justify-between mb-4">
          <Icon className="w-6 h-6 text-primary" />
          <div className="flex gap-2">
            <button 
              onClick={handleToggleBookmark}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                saved ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
            </button>
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
              {type}
            </span>
          </div>
        </div>

        <div className="cursor-pointer group/card" onClick={handlePreviewDetails}>
          <h3 className="text-lg font-black text-slate-900 dark:text-white line-clamp-1 group-hover/title:text-[#2563EB] group-hover/title:underline transition-all">
            {title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 mt-2 mb-6 h-8 font-medium">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-x-2.5 mb-6 mt-auto text-[10px] font-black uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-x-1 px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <Star className="w-3 h-3 text-amber-500 fill-current" />
            <span className="text-slate-900 dark:text-white">{rating > 0 ? rating.toFixed(1) : "0.0"}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <Eye className="w-3.5 h-3.5 text-sky-500" />
            <span className="whitespace-nowrap">{views > 1000 ? (views/1000).toFixed(1) + 'K' : views} <span className="hidden lg:inline opacity-50 ml-0.5">Views</span></span>
          </div>
          <div className="flex items-center gap-x-1">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
            <span className="whitespace-nowrap">{downloads > 1000 ? (downloads/1000).toFixed(1) + 'K' : downloads} <span className="hidden lg:inline opacity-50 ml-0.5">Pulse</span></span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 mt-auto border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <div className="hidden xl:block">
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Author</p>
              <p className="text-[10px] text-slate-900 dark:text-white font-black truncate max-w-[50px] leading-none uppercase">{owner}</p>
            </div>
          </div>
          <button 
            onClick={handlePreviewDetails}
            className="bg-foreground text-background text-[8px] font-black uppercase tracking-[0.1em] px-3 md:px-4 py-2.5 rounded-xl hover:scale-105 transition-all active:scale-95 shadow-md flex items-center gap-2 border border-transparent hover:border-primary/20 whitespace-nowrap"
          >
            Preview Details
          </button>
        </div>
      </div>

      {showFeatures && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-300 pointer-events-auto">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                  <Zap className="w-5 h-5 text-sky-600" />
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Quick Features</h4>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFeatures(false);
                }} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="space-y-4">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Features</h5>
                {features && features.length > 0 ? (
                  features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tighter">{f}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 italic py-4">No features listed for this resource.</p>
                )}
              </div>

              {/* Feedback Form */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Submit Feedback</h5>
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className={cn(
                          "transition-all hover:scale-125",
                          userRating >= star ? "text-amber-500" : "text-slate-200 dark:text-slate-700"
                        )}
                      >
                        <Star className={cn("w-6 h-6", userRating >= star && "fill-current")} />
                      </button>
                    ))}
                  </div>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your technical experience with this tool..."
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 min-h-[100px]"
                  />
                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50"
                  >
                    {isPending ? "Syncing System..." : "Submit Experience Registry"}
                  </button>
                </form>
              </div>

              <Link 
                href={`/resource/${slug}`}
                onClick={handleDownload}
                className="flex items-center justify-center w-full py-4 bg-[#2563EB] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all gap-2"
              >
                <Download className="w-4 h-4" />
                View Full Documentation
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
