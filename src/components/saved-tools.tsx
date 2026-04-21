"use client";

import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { toggleBookmark } from "@/app/actions/profile";
import { toast } from "sonner";

interface SavedToolsProps {
  tools: any[];
}

export default function SavedTools({ tools }: SavedToolsProps) {
  const handleRemove = async (id: string) => {
    const res = await toggleBookmark(id);
    if (res.success) {
      toast.success("Removed from bookmarks");
      window.location.reload();
    }
  };

  if (tools.length === 0) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Safe Library Empty</h3>
            <p className="text-slate-500 font-medium mb-8">You haven't bookmarked any tools yet. Save items to access them later quickly.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <div key={tool._id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg relative group">
          <div className="flex items-start justify-between mb-4">
             <div className="p-2 bg-sky-50 dark:bg-sky-900/30 rounded-xl text-sky-600">
                <Bookmark className="w-5 h-5 fill-current" />
             </div>
             <button 
                onClick={() => handleRemove(tool._id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
             >
                <Trash2 className="w-4 h-4" />
             </button>
          </div>
          <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 truncate">{tool.title}</h4>
          <p className="text-slate-500 text-xs font-medium mb-6 line-clamp-2">{tool.description}</p>
          
          <Link 
            href={`/resource/${tool.slug}`}
            className="w-full py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-x-2 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Quick Access
          </Link>
        </div>
      ))}
    </div>
  );
}
