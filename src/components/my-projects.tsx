"use client";

import { Trash2, Edit3, ExternalLink, Eye, Download } from "lucide-react";
import { deleteSubmission } from "@/app/actions/profile";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MyProjectsProps {
  submissions: any[];
}

export default function MyProjects({ submissions }: MyProjectsProps) {
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    const formData = new FormData();
    formData.append("id", id);
    const res = await deleteSubmission(formData);
    if (res.success) {
      toast.success("Project removed successfully");
      window.location.reload();
    } else {
      toast.error(res.error || "Failed to delete");
    }
  };

  if (submissions.length === 0) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FolderKanban className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">No Projects Found</h3>
            <p className="text-slate-500 font-medium mb-8">You haven't contributed any software yet. Start sharing to see your projects here!</p>
            <Link href="/contribute" className="inline-flex items-center gap-x-2 px-8 py-4 bg-sky-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-sky-700 transition-all shadow-xl">
                Contribute Now
            </Link>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {submissions.map((sub) => (
        <div key={sub._id} className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 shadow-lg group hover:border-sky-500/50 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                sub.status === "approved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                sub.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}>
                {sub.status}
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={() => handleDelete(sub._id.toString(), sub.title)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
          </div>

          <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 truncate">{sub.title}</h4>
          <p className="text-slate-500 text-xs font-medium mb-6 line-clamp-2">{sub.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center gap-x-3">
                    <div className="p-2 bg-sky-100 dark:bg-sky-900/40 rounded-lg text-sky-600 dark:text-sky-400">
                        <Eye className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">Views</p>
                        <p className="font-black text-slate-900 dark:text-white">{sub.views || 0}</p>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center gap-x-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Download className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">Hits</p>
                        <p className="font-black text-slate-900 dark:text-white">{sub.downloads || 0}</p>
                    </div>
                </div>
          </div>

          <Link 
            href={sub.status === 'approved' ? `/resource/${sub.title.toLowerCase().replace(/ /g, '-')}` : '#'}
            className={cn(
                "w-full py-3 rounded-xl border border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-x-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-800",
                sub.status !== 'approved' && "opacity-50 pointer-events-none"
            )}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Public Page
          </Link>
        </div>
      ))}
    </div>
  );
}

import { FolderKanban } from "lucide-react";
