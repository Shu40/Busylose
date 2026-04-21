import { UserPlus, CloudUpload, Share2, Award } from "lucide-react";

const steps = [
    { title: "Sign Up", desc: "Create your pro developer account in seconds.", icon: UserPlus, color: "text-sky-600", bg: "bg-sky-50" },
    { title: "Upload Project", desc: "Share your tools, software or website code.", icon: CloudUpload, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Get Verified", desc: "Our team reviews and approves your submission.", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Share & Earn", desc: "Reach thousands of users globally.", icon: Share2, color: "text-orange-600", bg: "bg-orange-50" },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[4rem] mx-6">
        <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none text-white dark:text-[#0F172A]">How It Works</h2>
                <p className="text-slate-400 dark:text-slate-600 font-medium">Join the ecosystem in four simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 dark:bg-slate-200 -z-0" />

                {steps.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-6">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl relative ${step.bg}`}>
                            <step.icon className={`w-8 h-8 ${step.color}`} />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 dark:bg-slate-200 rounded-full flex items-center justify-center text-xs font-black border-4 border-slate-900 dark:border-white">
                                {idx + 1}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-white dark:text-[#0F172A]">{step.title}</h3>
                            <p className="text-sm text-slate-400 dark:text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
