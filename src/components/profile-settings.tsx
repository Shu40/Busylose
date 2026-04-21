"use client";

import { IUser } from "@/models/User";
import { useState } from "react";
import { updateProfile } from "@/app/actions/profile";
import { toast } from "sonner";
import { User, Mail, FileText, Code, Terminal, Link, Globe, Save, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

interface ProfileSettingsProps {
  user: any;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || "",
    skills: user.skills?.join(", ") || "",
    github: user.socialLinks?.github || "",
    linkedin: user.socialLinks?.linkedin || "",
    portfolio: user.socialLinks?.portfolio || "",
    theme: user.theme || "light"
  });

  const { theme: currentTheme, setTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateProfile({
        ...formData,
        skills: formData.skills.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "")
      });
      if (res.success) {
        toast.success("Profile updated successfully!");
        window.location.reload();
      } else {
        toast.error(res.error || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-12">
      <div className="mb-12">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">System Settings</h3>
        <p className="text-slate-500 font-medium">Update your digital identity and professional information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputGroup 
                label="Full Name" 
                icon={User} 
                value={formData.name} 
                onChange={(v) => setFormData({...formData, name: v})} 
            />
            <InputGroup 
                label="Email Address" 
                icon={Mail} 
                value={formData.email} 
                onChange={(v) => setFormData({...formData, email: v})} 
                disabled
            />
        </div>

        {/* Bio & Skills */}
        <div className="space-y-8">
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Professional Bio</label>
                <div className="relative">
                    <textarea 
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 h-32 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-medium text-slate-700 dark:text-slate-300"
                        placeholder="Write a short summary about your expertise..."
                    />
                    <FileText className="absolute right-6 top-6 w-5 h-5 text-slate-400" />
                </div>
            </div>

            <InputGroup 
                label="Skills (Comma separated)" 
                icon={Code} 
                value={formData.skills} 
                onChange={(v) => setFormData({...formData, skills: v})} 
                placeholder="React, Node.js, Ethical Hacking, Python..."
            />
        </div>

        {/* Social Links */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Social Connections</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputGroup label="GitHub" icon={Terminal} value={formData.github} onChange={(v) => setFormData({...formData, github: v})} />
                <InputGroup label="LinkedIn" icon={Link} value={formData.linkedin} onChange={(v) => setFormData({...formData, linkedin: v})} />
                <InputGroup label="Portfolio" icon={Globe} value={formData.portfolio} onChange={(v) => setFormData({...formData, portfolio: v})} />
            </div>
        </div>

        {/* Theme Preference */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Visual System Preference</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { id: 'light', label: 'Daylight', icon: Sun, color: 'bg-amber-500', desc: 'Clean & professional' },
                    { id: 'dark', label: 'Midnight', icon: Moon, color: 'bg-indigo-600', desc: 'Sleek & high-contrast' },
                    { id: 'hacker', label: 'Hacker', icon: Terminal, color: 'bg-emerald-500', desc: 'CRACKED Neon Matrix' }
                ].map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                            setFormData({...formData, theme: t.id as any});
                            setTheme(t.id as any);
                        }}
                        className={cn(
                            "relative overflow-hidden p-6 rounded-3xl border-2 transition-all text-left group",
                            formData.theme === t.id 
                                ? "border-sky-500 bg-sky-50/50 dark:bg-sky-900/20" 
                                : "border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                        )}
                    >
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg", t.color)}>
                            <t.icon className="w-5 h-5" />
                        </div>
                        <p className="font-black uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">{t.label}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">{t.desc}</p>
                        {formData.theme === t.id && (
                            <div className="absolute top-4 right-4 w-2 h-2 bg-sky-500 rounded-full animate-ping" />
                        )}
                    </button>
                ))}
            </div>
        </div>

        <button 
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-12 py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-sky-600 dark:hover:bg-sky-400 hover:text-white transition-all shadow-xl flex items-center justify-center gap-x-3 disabled:opacity-50"
        >
            <Save className="w-5 h-5" />
            {loading ? "Syncing..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

function InputGroup({ label, icon: Icon, value, onChange, disabled = false, placeholder = "" }: { label: string; icon: any; value: string; onChange: (v: string) => void, disabled?: boolean, placeholder?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{label}</label>
            <div className="relative">
                <input 
                    type="text" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={cn(
                        "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 pl-12 focus:ring-2 focus:ring-sky-500 outline-none transition-all font-bold text-slate-800 dark:text-white",
                        disabled && "opacity-50 cursor-not-allowed bg-slate-100"
                    )}
                />
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
        </div>
    )
}
