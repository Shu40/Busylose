import { User, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Creator {
    name: string;
    email: string;
    impact: string;
    uploads: number;
}

export function TopCreators({ creators }: { creators: Creator[] }) {
  return (
    <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
                    Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">Creators.</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">The most impactful contributors driving the BusyLoss ecosystem.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {creators.map((creator, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center text-center group">
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg relative z-10 overflow-hidden">
                                <User className="w-12 h-12 text-slate-300" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-2 rounded-full shadow-lg z-20 border-4 border-white dark:border-slate-900">
                                <Award className="w-4 h-4" />
                            </div>
                            <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                        </div>

                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">{creator.name}</h3>
                        <p className="text-xs text-slate-400 font-bold mb-6 truncate w-full px-4 italic opacity-60">Verified Contributor</p>

                        <div className="w-full grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{creator.impact}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Views</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{creator.uploads}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Projects</p>
                            </div>
                        </div>

                        <Link 
                            href={`/profile`}
                            className="mt-8 w-full py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center gap-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 hover:bg-sky-600 hover:text-white transition-all shadow-sm"
                        >
                            View Portfolio <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
