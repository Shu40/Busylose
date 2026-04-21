import { submitResource } from "@/app/actions/submission";
import { CheckCircle2, Info } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ContributePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { success } = await searchParams;
  const isSuccess = success === "true";
  const isDirect = success === "direct";

  return (
    <div className="max-w-3xl mx-auto p-6">
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-x-3 text-green-700 animate-in slide-in-from-top duration-500">
          <CheckCircle2 className="w-5 h-5" />
          <p className="text-sm font-bold">Tool submitted successfully! It will be live after admin review.</p>
        </div>
      )}

      {isDirect && (
        <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-x-3 text-sky-700 animate-in slide-in-from-top duration-500">
          <Info className="w-5 h-5" />
          <p className="text-sm font-bold">Admin submission successful! Your tool is now live on the platform.</p>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h1 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Contribute to BusyLoss</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-medium italic">Share your software, website, or tools with the community.</p>
        </div>
        
        <div className="p-8">
          <form action={async (formData) => {
            "use server";
            await submitResource(formData);
          }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#475569] dark:text-slate-300" htmlFor="ownerName">Your Name</label>
                <input 
                  id="ownerName" 
                  name="ownerName" 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="mobileNumber">Mobile Number (Optional)</label>
                <input 
                  id="mobileNumber" 
                  name="mobileNumber" 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="+91 ..." 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="title">Software/Website Title</label>
                <input 
                  id="title" 
                  name="title" 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="e.g., Photoshop Pro" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">Category</label>
                <select 
                  name="category" 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all appearance-none"
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

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="link">Download/Website Link</label>
              <input 
                id="link" 
                name="link" 
                type="url" 
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                placeholder="https://..." 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="contactEmail">Contact Email (for users)</label>
                <input 
                  id="contactEmail" 
                  name="contactEmail" 
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="support@yourtool.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="features">Key Features (comma separated)</label>
                <input 
                  id="features" 
                  name="features" 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Fast, Secure, Open Source" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="description">Short Description</label>
              <textarea 
                id="description" 
                name="description" 
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                placeholder="What does this software do? Give a brief overview." 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-sky-500/20 transition-all transform active:scale-[0.98]"
            >
              Submit for Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
