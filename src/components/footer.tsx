import { Link as LinkIcon, Terminal, Heart, ExternalLink, Globe, ShieldCheck, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-1 md:col-span-2 space-y-8">
                    <div className="flex items-center gap-x-2">
                        <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white dark:text-slate-900 font-black text-xl">B</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">BusyLoss</h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm font-medium leading-relaxed">
                        The ultimate destination for developers to share, build, and distribute premium tools across every major platform. Community powered, dev verified.
                    </p>
                    <div className="flex items-center gap-x-4">
                        <SocialIcon icon={Globe} />
                        <SocialIcon icon={LinkIcon} />
                        <SocialIcon icon={Terminal} />
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Exploration</h4>
                    <ul className="space-y-4">
                        <FooterLink label="Windows Tools" href="/windows" />
                        <FooterLink label="Linux Utilities" href="/linux" />
                        <FooterLink label="Android APKs" href="/android" />
                        <FooterLink label="Web Templates" href="/websites" />
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Platform</h4>
                    <ul className="space-y-4">
                        <FooterLink label="How it Works" href="/#how-it-works" />
                        <FooterLink label="Expert Talking" href="/expert" />
                        <FooterLink label="Contribute" href="/contribute" />
                        <FooterLink label="Support" href="/support" />
                    </ul>
                </div>
            </div>

            <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    © 2026 BusyLoss. All Rights Reserved. Built with <Heart className="w-3 h-3 inline text-red-500 mx-1" /> for Developers.
                </p>
                <div className="flex items-center gap-x-8">
                    <FooterLink label="Privacy" href="/privacy" />
                    <FooterLink label="Terms" href="/terms" />
                    <FooterLink label="Security" href="/security" />
                </div>
            </div>
        </div>
    </footer>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
    return (
        <li>
            <Link href={href} className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-600 transition-colors">
                {label}
            </Link>
        </li>
    )
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all">
            <Icon className="w-5 h-5" />
        </a>
    )
}
