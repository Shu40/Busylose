import dbConnect from "@/lib/db";
import Resource from "@/models/Resource";
import { notFound } from "next/navigation";
import { Download, Mail, Globe, Shield, CheckCircle2, Calendar, User, Eye, BarChart3, Clock } from "lucide-react";
import Link from "next/link";
import { trackView, trackDownload } from "@/app/actions/profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;
  const resource = await Resource.findOne({ slug }).lean();

  if (!resource) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-10"></div>
        <div className="p-8 md:p-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-x-3">
                <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400 text-xs font-black uppercase tracking-widest rounded-full">
                  {(resource as any).category}
                </span>
                <span className="flex items-center gap-x-1 text-slate-400 text-xs font-bold">
                  <Clock className="w-3 h-3" />
                  Live since {new Date((resource as any).uploadDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight leading-none">
                {(resource as any).title}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                {(resource as any).description}
              </p>
            </div>
            <div className="flex flex-col gap-4 min-w-[240px]">
              <a 
                href={(resource as any).downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={async () => {
                   "use server";
                   await trackDownload((resource as any)._id.toString());
                }}
                className="w-full bg-sky-700 hover:bg-sky-800 text-white px-8 py-4 rounded-2xl font-black text-center shadow-xl hover:shadow-sky-500/20 transition-all flex items-center justify-center gap-x-3 uppercase tracking-tighter"
              >
                <Download className="w-5 h-5" />
                Download / Visit Now
              </a>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <div className="flex items-center justify-center gap-x-1 text-sky-600 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-black">{(resource as any).views || 0}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Views</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <div className="flex items-center justify-center gap-x-1 text-green-600 mb-1">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm font-black">{(resource as any).downloads || 0}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Interaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-x-3 uppercase tracking-tight">
              <Shield className="w-6 h-6 text-sky-600" />
              Key Features & Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(resource as any).features?.length > 0 ? (
                (resource as any).features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-x-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-[#475569] dark:text-slate-300 font-medium">{feature}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-6 text-slate-400 font-medium italic bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed">
                  No specific features listed for this tool.
                </div>
              )}
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">About the Developer</h2>
              <p className="text-slate-300 mb-8 leading-relaxed max-w-xl">
                This tool was contributed by <span className="text-white font-bold">{(resource as any).owner}</span>. 
                BusyLoss ensures all tools are scanned and verified for community safety.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-x-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                  <User className="w-5 h-5 text-sky-400" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Founder</p>
                    <p className="font-bold text-white">{(resource as any).owner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                   <Mail className="w-5 h-5 text-sky-400" />
                   <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Contact</p>
                    <p className="font-bold text-white truncate max-w-[150px]">{(resource as any).contactEmail || "Protected"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full"></div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">Technical Info</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Uptime</span>
                <span className="text-green-500 font-black">{(resource as any).uptime || "100%"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Released</span>
                <span className="text-slate-700 dark:text-slate-300 font-black">{new Date((resource as any).uploadDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Category</span>
                <span className="text-sky-600 font-black uppercase tracking-tighter">{(resource as any).category}</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <p className="text-[11px] text-amber-700 dark:text-amber-400 font-bold leading-relaxed text-center">
                Always ensure you have a fallback and follow the installation guide provided by the owner.
              </p>
            </div>
          </div>

          <Link 
            href="/expert"
            className="block p-8 bg-sky-50 dark:bg-sky-900/20 rounded-3xl border border-sky-100 dark:border-sky-800 group hover:bg-sky-700 transition-all"
          >
            <h4 className="text-sky-900 dark:text-sky-400 group-hover:text-white font-black mb-2 uppercase tracking-tighter">Read Expert Reviews</h4>
            <p className="text-sky-700/70 dark:text-sky-500 group-hover:text-sky-100 text-sm font-medium">See what others are saying about {(resource as any).title} and share your feedback.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
