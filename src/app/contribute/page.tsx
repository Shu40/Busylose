import { submitResource } from "@/app/actions/submission";
import { CheckCircle2, Info } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Submission from "@/models/Submission";
import { ContributeForm } from "@/components/contribute/ContributeForm";

export default async function ContributePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { success } = await searchParams;
  const isSuccess = success === "true";
  const isDirect = success === "direct";

  await dbConnect();
  const isAdmin = (session.user as any).role === "admin";
  const pendingSubmissionRaw = !isAdmin ? await Submission.findOne({ 
    userId: (session.user as any).id, 
    status: "pending" 
  }).lean() : null;
  const pendingSubmission = pendingSubmissionRaw as any;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {isSuccess && (
        <div className="mb-6 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-3xl flex items-start gap-x-4 text-emerald-900 animate-in slide-in-from-top duration-700 shadow-sm">
          <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-tight">Submission Received!</p>
            <p className="text-xs font-bold leading-relaxed opacity-80">
              Thanks for submitting! Your website hosting details will be shared within 2 days. 
              Please wait and contact me at <span className="underline decoration-2 underline-offset-2 decoration-emerald-200 font-black">kumarshubham35568@gmail.com</span> if you have any questions.
            </p>
          </div>
        </div>
      )}

      {isDirect && (
        <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-x-3 text-sky-700 animate-in slide-in-from-top duration-500">
          <Info className="w-5 h-5" />
          <p className="text-sm font-bold">Admin submission successful! Your tool is now live on the platform.</p>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h1 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Contribute to BusyLoss</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-medium italic">Share your software, website, or tools with the community.</p>
        </div>
        
        <div className="p-8">
          {pendingSubmission ? (
            <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-full">
                <Info className="w-6 h-6 text-amber-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-black text-amber-900 uppercase tracking-tight">Active Submission Pending</h3>
                <p className="text-xs font-bold text-amber-700 leading-relaxed max-w-md mx-auto">
                  You already have a submission for <strong>"{pendingSubmission.title}"</strong> waiting for review. 
                  To prevent multiple requests, you cannot submit a new one until this is approved or processed.
                </p>
              </div>
              <div className="pt-2">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                  <span>Contact:</span> 
                  <span className="text-amber-700 font-black">kumarshubham35568@gmail.com</span>
                </p>
              </div>
            </div>
          ) : (
            <ContributeForm />
          )}
        </div>
      </div>
    </div>
  );
}
