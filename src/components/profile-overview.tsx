"use client";

import { Mail, Terminal, Link, Briefcase, Calendar, ShieldCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileOverviewProps {
  user: any;
  stats: {
    uploads: number;
    downloads: number;
    views: number;
    rank: string;
  };
}

export default function ProfileOverview({ user, stats }: ProfileOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bio Card */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] -mr-10 -mt-10 rounded-full" />
            <h3 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight mb-6">About Me</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg">
                {user.bio || "No bio updated yet. Tell the community something about yourself!"}
            </p>
            
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</p>
                    <div className="flex items-center gap-x-1.5 text-slate-700 dark:text-slate-300 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-sky-500" />
                        <span>Remote</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Joined</p>
                    <div className="flex items-center gap-x-1.5 text-slate-700 dark:text-slate-300 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-green-500" />
                        <span>{new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account</p>
                    <div className="flex items-center gap-x-1.5 text-slate-700 dark:text-slate-300 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="uppercase">{user.role}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</p>
                    <div className="flex items-center gap-x-1.5 text-slate-700 dark:text-slate-300 font-bold">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Verified</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
             <h3 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight mb-6">Expertise & Skills</h3>
             <div className="flex flex-wrap gap-3">
                {user.skills?.length > 0 ? user.skills.map((skill: string) => (
                    <span key={skill} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 shadow-sm">
                        {skill}
                    </span>
                )) : (
                    <p className="text-slate-400 font-medium italic">Add skills in settings to showcase your expertise.</p>
                )}
             </div>
        </div>
      </div>

      {/* Stats Sidebar */}
      <div className="space-y-8">
        <div className="bg-slate-900 dark:bg-white rounded-[2.5rem] p-8 text-white dark:text-slate-900 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-slate-900/5 blur-[40px] -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-8">Performance Score</h4>
            <div className="space-y-8">
                <StatItem label="Total Contributions" value={stats.uploads} color="sky" />
                <StatItem label="Tool Interactions" value={stats.downloads > 1000 ? (stats.downloads/1000).toFixed(1) : stats.downloads} color="emerald" suffix={stats.downloads > 1000 ? "K+" : ""} />
                <StatItem label="Total Profile Views" value={stats.views > 1000 ? (stats.views/1000).toFixed(1) : stats.views} color="indigo" suffix={stats.views > 1000 ? "K+" : ""} />
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 dark:border-slate-200 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Global Rank</p>
                    <p className="text-2xl font-black">{stats.rank}</p>
                </div>
                <div className="px-4 py-2 bg-white/10 dark:bg-slate-100 rounded-xl text-[10px] font-black tracking-widest">
                    TOP 1%
                </div>
            </div>
        </div>

        {/* Social Links Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 font-medium">Digital Presence</h4>
             <div className="space-y-4">
                <SocialBtn icon={Terminal} label="GitHub" link={user.socialLinks?.github} color="bg-slate-900" />
                <SocialBtn icon={Link} label="LinkedIn" link={user.socialLinks?.linkedin} color="bg-blue-600" />
                <SocialBtn icon={Briefcase} label="Portfolio" link={user.socialLinks?.portfolio} color="bg-sky-500" />
             </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color, suffix = "" }: { label: string; value: number | string; color: string; suffix?: string }) {
    return (
        <div className="group/stat">
            <p className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-2 group-hover/stat:opacity-100 transition-opacity">{label}</p>
            <div className="flex items-end gap-x-2">
                <span className="text-4xl font-black leading-none">{value}{suffix}</span>
                <div className={cn("w-1.5 h-1.5 rounded-full mb-1", 
                    color === "sky" && "bg-sky-400",
                    color === "emerald" && "bg-emerald-400",
                    color === "indigo" && "bg-indigo-400",
                )} />
            </div>
        </div>
    )
}

function SocialBtn({ icon: Icon, label, link, color }: { icon: any; label: string; link?: string; color: string }) {
    return (
        <a 
            href={link || "#"} 
            className={cn(
                "flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group/btn",
                !link && "opacity-30 grayscale pointer-events-none"
            )}
        >
            <div className="flex items-center gap-x-3">
                <div className={cn("p-2 rounded-xl text-white", color)}>
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">{label}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover/btn:bg-sky-500 group-hover/btn:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        </a>
    )
}
