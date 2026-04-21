import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserStats, getAnalyticsData, getSavedTools, getCreatorStats } from "@/app/actions/profile";
import DashboardPanel from "@/components/profile-dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }

  const [mainData, analytics, savedTools, creatorStats] = await Promise.all([
    getUserStats(),
    getAnalyticsData('week'),
    getSavedTools(),
    getCreatorStats()
  ]);

  if (!mainData) return (
    <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Accessing Dashboard Panel...</p>
        </div>
    </div>
  );

  return (
    <DashboardPanel 
        user={mainData.user}
        submissions={mainData.submissions}
        analytics={analytics}
        savedTools={savedTools}
        creatorStats={creatorStats || []}
    />
  );
}
