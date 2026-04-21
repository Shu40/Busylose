"use client";

import { Shield } from "lucide-react";

export function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="fixed bottom-8 right-8 bg-sky-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95 print:hidden group z-[100]"
    >
      <span className="hidden group-hover:inline mr-2 text-xs font-bold transition-all">Download Certificate</span>
      <Shield className="w-6 h-6 inline" />
    </button>
  );
}
