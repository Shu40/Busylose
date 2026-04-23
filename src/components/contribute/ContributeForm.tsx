"use client";

import { useState } from "react";
import { submitResource } from "@/app/actions/submission";
import { Loader2, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContributeForm() {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  return (
    <form action={async (formData) => {
        setIsSubmitLoading(true);
        await submitResource(formData);
        setIsSubmitLoading(false);
    }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#475569] dark:text-slate-300" htmlFor="ownerName">Your Name</label>
          <input 
            id="ownerName" 
            name="ownerName" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-medium"
            placeholder="Enter your name" 
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#475569] dark:text-slate-300" htmlFor="contactEmail">Contact Email</label>
          <input 
            id="contactEmail" 
            name="contactEmail" 
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-medium"
            placeholder="support@yourtool.com" 
            required 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#475569] dark:text-slate-300" htmlFor="title">Software Title</label>
          <input 
            id="title" 
            name="title" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-medium"
            placeholder="e.g., Photoshop Pro" 
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#475569] dark:text-slate-300" htmlFor="category">Category</label>
          <select 
            name="category" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all appearance-none font-medium"
            required
          >
            <option value="">Select category</option>
            <option value="Windows">Windows</option>
            <option value="Linux">Linux</option>
            <option value="Android">Android</option>
            <option value="Website">Website</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-widest text-[#475569] dark:text-slate-300 flex items-center justify-between" htmlFor="link">
          <span>Website/Download Link</span>
        </label>
        <div className="relative group">
          <input 
            id="link" 
            name="link" 
            type="url" 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 focus:border-sky-500 transition-all outline-none font-bold text-sm"
            placeholder="https://..." 
            required 
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <LinkIcon className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

       <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#475569] dark:text-slate-300" htmlFor="description">Short Description</label>
          <textarea 
            id="description" 
            name="description" 
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-medium"
            placeholder="What does this software do? Give a brief overview." 
            required 
          />
        </div>

      <button 
        type="submit" 
        disabled={isSubmitLoading}
        className={cn(
            "w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl flex items-center justify-center gap-x-2",
            isSubmitLoading ? "bg-slate-100 text-slate-400 cursor-not-allowed" :
            "bg-[#0F172A] dark:bg-[#2563EB] text-white hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        {isSubmitLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit for Approval"}
      </button>
    </form>
  );
}
