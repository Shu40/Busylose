import dbConnect from "@/lib/db";
import Submission from "@/models/Submission";
import { notFound } from "next/navigation";
import { ShieldCheck, Award, Globe, Shield } from "lucide-react";
import { PrintButton } from "@/components/print-button";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await dbConnect();
  
  const submission = await Submission.findById(id).lean();
  
  if (!submission || submission.status !== 'approved') {
    notFound();
  }

  const certificateDate = new Date(submission.processedAt || submission.submittedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 border-[12px] border-double border-sky-700/20 p-8 md:p-16 relative overflow-hidden shadow-2xl rounded-sm">
        {/* ... (rest of the certificate UI) */}
        
        <div className="relative z-10 text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Award className="w-24 h-24 text-sky-700" />
              <ShieldCheck className="w-8 h-8 text-sky-700 absolute bottom-0 right-0 bg-white dark:bg-slate-900 rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-sky-700">Certificate of Contribution</h1>
            <h2 className="text-5xl font-serif text-slate-900 dark:text-white italic">BusyLoss Community</h2>
          </div>

          <div className="py-8 space-y-4">
            <p className="text-slate-500 dark:text-slate-400 font-medium">This is to certify that</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white underline underline-offset-8 decoration-sky-700/30">
              {submission.ownerName}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Has successfully contributed the tool <span className="font-bold text-sky-700">"{submission.title}"</span> to the BusyLoss platform. 
              The contribution in the <span className="font-bold text-sky-700">{submission.category}</span> category has been verified and is now live for public access.
            </p>
            <p className="text-sky-700 font-black uppercase tracking-widest text-xs pt-4">
              Permanent Member of BusyLoss
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <p className="text-sm font-serif italic text-slate-900 dark:text-white text-2xl">Shubham Kumar</p>
              <div className="w-48 h-[1px] bg-slate-300 dark:bg-slate-700 mx-auto" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Founder & CEO, BusyLoss</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{certificateDate}</p>
              <div className="w-48 h-[1px] bg-slate-300 dark:bg-slate-700 mx-auto" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date of Issuance</p>
            </div>
          </div>

          <div className="pt-12 flex justify-center items-center gap-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Globe className="w-3 h-3" />
            <span>Official Digital Verification: BUSYLOSS-CERT-{submission._id.toString().substring(0,8).toUpperCase()}</span>
          </div>
        </div>
      </div>
      
      <PrintButton />

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          .max-w-4xl, .max-w-4xl * { visibility: visible; }
          .max-w-4xl { position: absolute; left: 0; top: 0; width: 100%; border: none; }
        }
      `}} />
    </div>
  );
}
