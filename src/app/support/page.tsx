import { HelpCircle, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { SupportChatbot } from "@/components/support-bot";

export default function SupportPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-12 pb-20">
      {/* ... (existing content) */}
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Global Support Center</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Need help? Our team is available 24/7 to assist you with tools, submissions, or technical issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border shadow-sm hover:shadow-lg transition-all group">
          <Mail className="w-10 h-10 text-sky-700 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">Email Support</h2>
          <p className="text-sm text-slate-500 mb-6">Standard response time is within 24 hours.</p>
          <a href="mailto:support@busyloss.com" className="font-bold text-sky-700 underline">support@busyloss.com</a>
        </div>
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border shadow-sm hover:shadow-lg transition-all group">
          <MessageSquare className="w-10 h-10 text-indigo-700 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">Support AI Bot</h2>
          <p className="text-sm text-slate-500 mb-6">Get instant help navigating BusyLoss.</p>
          <div className="text-[10px] font-black uppercase text-indigo-500 animate-pulse mb-2">Bot Available Now</div>
          <p className="text-xs text-slate-400 font-medium">Click the chat icon on the bottom right to start talking!</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-x-3 text-slate-900 dark:text-white border-b-2 border-slate-100 dark:border-slate-800 pb-4">
          <HelpCircle className="w-6 h-6 text-sky-700" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            { q: "How long does it take for my tool to be approved?", a: "Most submissions are reviewed within 48 hours." },
            { q: "Is it free to submit tools?", a: "Yes, BusyLoss is a community platform and we don't charge for standard listings." },
            { q: "How do I report a broken link?", a: "Use the 'Report' button on the tool page or email us directly." },
          ].map((faq, i) => (
            <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-l-4 border-sky-700">
              <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white tracking-tight">{faq.q}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-3 text-slate-400 text-sm font-bold bg-slate-100 dark:bg-slate-800/30 py-4 rounded-full">
        <ShieldCheck className="w-4 h-4 text-green-500" />
        All support requests are encrypted and secure.
      </div>

      <SupportChatbot />
    </div>
  );
}
