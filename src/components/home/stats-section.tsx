import { Download, LayoutPanelTop, Users, TrendingUp } from "lucide-react";

interface StatsSectionProps {
    downloads: string;
    projects: string;
    creators: string;
}

export function StatsSection({ downloads, projects, creators }: StatsSectionProps) {
  return (
    <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={TrendingUp} value={downloads} label="Total Views" color="sky" />
            <StatCard icon={LayoutPanelTop} value={projects} label="Projects" color="indigo" />
            <StatCard icon={Users} value={creators} label="Creators" color="emerald" />
            <StatCard icon={Download} value="99%" label="Uptime" color="orange" />
        </div>
    </section>
  );
}

function StatCard({ icon: Icon, value, label, color }: { icon: any; value: string; label: string; color: string }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 -mr-8 -mt-8 rounded-full ${
                color === "sky" ? "bg-sky-500" :
                color === "indigo" ? "bg-indigo-500" :
                color === "emerald" ? "bg-emerald-500" :
                color === "orange" ? "bg-orange-500" : ""
            }`} />
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`p-4 rounded-2xl mb-4 ${
                    color === "sky" ? "bg-sky-50 text-sky-600 dark:bg-sky-900/40" :
                    color === "indigo" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40" :
                    color === "emerald" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40" :
                    color === "orange" ? "bg-orange-50 text-orange-600 dark:bg-orange-900/40" : ""
                }`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">{value}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
            </div>
        </div>
    )
}
