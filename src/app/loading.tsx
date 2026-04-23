import { Terminal } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] bg-white dark:bg-slate-950 flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        {/* Animated outer ring */}
        <div className="w-20 h-20 rounded-2xl border-4 border-slate-100 dark:border-slate-800 animate-pulse" />
        <div className="absolute inset-0 w-20 h-20 rounded-2xl border-t-4 border-[#2563EB] animate-spin" />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Terminal className="w-8 h-8 text-[#2563EB] animate-bounce" />
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">BusyLoss</h2>
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
