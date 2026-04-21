import { Monitor, Terminal, Globe, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
    { title: "Windows", icon: Monitor, color: "bg-sky-500", link: "/windows", desc: "Software & Desktop Utilities" },
    { title: "Linux", icon: Terminal, color: "bg-emerald-500", link: "/linux", desc: "Scripts & Terminal Tools" },
    { title: "Android", icon: Smartphone, color: "bg-orange-500", link: "/android", desc: "APK & Mobile Projects" },
    { title: "Website", icon: Globe, color: "bg-indigo-500", link: "/websites", desc: "Templates & Source Code" },
];

export function CategoriesGrid() {
  return (
    <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-4">
                        Everything You <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">Need to Build.</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Categorized resources optimized for different ecosystems.</p>
                </div>
                <Link href="/windows" className="group flex items-center gap-x-2 text-xs font-black uppercase tracking-widest text-[#2563EB] hover:underline transition-all">
                    View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Link 
                        key={cat.title} 
                        href={cat.link}
                        className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-sky-500/30 transition-all relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full blur-[40px] -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className={cn("relative z-10 inline-flex p-4 rounded-2xl text-white mb-6 transition-transform group-hover:scale-110 group-hover:-rotate-3 shadow-lg", cat.color)}>
                            <cat.icon className="w-6 h-6" />
                        </div>
                        <h3 className="relative z-10 text-xl font-bold text-slate-900 dark:text-white mb-2">{cat.title}</h3>
                        <p className="relative z-10 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{cat.desc}</p>
                        
                        <div className="relative z-10 mt-8 flex items-center gap-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                            Explore Assets <ArrowRight className="w-3 h-3" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
}
