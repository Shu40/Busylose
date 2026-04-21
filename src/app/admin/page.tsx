import dbConnect from "@/lib/db";
import Resource from "@/models/Resource";
import User from "@/models/User";
import Submission from "@/models/Submission";
import { approveSubmission, rejectSubmission } from "@/app/actions/submission";
import { toggleUserBlock, approveUser, rejectUser } from "@/app/actions/user";
import { toggleFeedbackForm, getSiteConfig } from "@/app/actions/config";
import { 
  BarChart3, 
  CheckCircle, 
  Clock, 
  FilePlus, 
  LayoutDashboard, 
  ShieldAlert, 
  Users,
  Search,
  Check,
  X,
  Lock,
  Unlock,
  MessageCircle,
  ToggleLeft as ToggleIcon,
  Settings
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    redirect("/login");
  }

  await dbConnect();
  const params = await searchParams;
  const currentTab = params.tab || "overview";

  // Data fetching based on tab
  const [totalSubmissions, pendingSubmissions, totalResources, totalUsers, pendingUsers] = await Promise.all([
    Submission.countDocuments(),
    Submission.countDocuments({ status: "pending" }),
    Resource.countDocuments(),
    User.countDocuments(),
    User.countDocuments({ isApproved: false })
  ]);

  const stats = [
    { label: "Submissions", value: totalSubmissions, icon: LayoutDashboard, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pending Tools", value: pendingSubmissions, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Pending Users", value: pendingUsers, icon: ShieldAlert, color: "text-red-600", bg: "bg-red-100" },
    { label: "Total Users", value: totalUsers, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  let displayContent;

  if (currentTab === "overview" || currentTab === "submissions") {
    const submissions = await Submission.find()
      .sort({ submittedAt: -1 })
      .limit(currentTab === "overview" ? 5 : 50)
      .populate({ path: 'userId', select: 'name email', model: User, strictPopulate: false })
      .lean();

    displayContent = (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden shadow-sm">
        <div className="p-4 border-b bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 dark:text-slate-200">
            {currentTab === "overview" ? "Recent Submissions" : "All Submissions"}
          </h2>
          {currentTab === "overview" && (
            <Link href="/admin?tab=submissions" className="text-xs text-sky-700 hover:underline font-bold">View All</Link>
          )}
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] uppercase tracking-wider text-slate-500 font-black border-b">
            <tr>
              <th className="px-6 py-4">Tool / Version</th>
              <th className="px-6 py-4">Contributor</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {submissions.map((sub: any) => (
              <tr key={sub._id.toString()} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white">{sub.title}</div>
                  <div className="text-[11px] text-slate-400">{sub.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{sub.ownerName}</div>
                  <div className="text-[11px] text-slate-400">{(sub.userId as any)?.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${
                    sub.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    sub.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {sub.status === "pending" && (
                    <div className="flex justify-end gap-x-2">
                       <form action={approveSubmission}>
                        <input type="hidden" name="id" value={sub._id.toString()} />
                        <button type="submit" className="p-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                      </form>
                      <form action={rejectSubmission}>
                        <input type="hidden" name="id" value={sub._id.toString()} />
                        <button type="submit" className="p-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  )}
                  {sub.status === "approved" && (
                    <span className="text-[11px] text-slate-400 font-bold italic">Live in {sub.category}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (currentTab === "users") {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    displayContent = (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden shadow-sm">
        <div className="p-4 border-b bg-slate-50/50 dark:bg-slate-800/50">
          <h2 className="font-bold text-slate-800 dark:text-slate-200">Registered Users</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] uppercase tracking-wider text-slate-500 font-black border-b">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Manage</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {users.map((user: any) => (
              <tr key={user._id.toString()} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold">{user.name}</div>
                  <div className="text-[11px] text-slate-400">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.isBlocked ? (
                    <span className="flex items-center gap-x-1 text-red-600 font-bold text-xs">
                      <ShieldAlert className="w-3 h-3" /> Blocked
                    </span>
                  ) : (
                    <span className="text-green-600 font-bold text-xs flex items-center gap-x-1">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {user.role !== 'admin' && (
                    <div className="flex justify-end gap-x-2">
                      {!user.isApproved ? (
                        <>
                          <form action={approveUser}>
                            <input type="hidden" name="userId" value={user._id.toString()} />
                            <button type="submit" className="p-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors" title="Approve User">
                              <Check className="w-4 h-4" />
                            </button>
                          </form>
                          <form action={rejectUser}>
                            <input type="hidden" name="userId" value={user._id.toString()} />
                            <button type="submit" className="p-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors" title="Reject/Remove User">
                              <X className="w-4 h-4" />
                            </button>
                          </form>
                        </>
                      ) : (
                        <form action={toggleUserBlock}>
                          <input type="hidden" name="userId" value={user._id.toString()} />
                          <button type="submit" className={`text-xs font-black uppercase px-3 py-1 rounded-full transition-all ${
                            user.isBlocked 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
                          }`}>
                            {user.isBlocked ? 'Unblock' : 'Block'}
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (currentTab === "activity") {
    const activity = await Submission.find()
      .sort({ submittedAt: -1 })
      .populate({ path: 'userId', select: 'name email', model: User, strictPopulate: false })
      .lean();
      
    displayContent = (
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-4 shadow-sm flex items-center justify-between">
            <h2 className="font-bold text-slate-800 dark:text-slate-200">Platform Activity</h2>
            <div className="flex items-center gap-x-2">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Filter activity..." className="pl-9 pr-4 py-1.5 text-xs border rounded-lg outline-none focus:ring-1 focus:ring-sky-500 w-48" />
                 </div>
            </div>
        </div>
        <div className="space-y-3">
            {activity.map((act: any) => (
                <div key={act._id.toString()} className="bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-sm flex items-center justify-between group hover:border-sky-500 transition-all">
                    <div className="flex items-center gap-x-4">
                        <div className={`p-2 rounded-full ${
                             act.status === 'approved' ? 'bg-green-50 text-green-600' :
                             act.status === 'rejected' ? 'bg-red-50 text-red-600' :
                             'bg-amber-50 text-amber-600'
                        }`}>
                            {act.status === 'approved' ? <Check className="w-4 h-4" /> : act.status === 'rejected' ? <X className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        <div>
                            <p className="text-sm">
                                <span className="font-bold text-slate-900 dark:text-white">{(act.userId as any)?.name || act.ownerName}</span>
                                <span className="text-slate-500 mx-2 text-xs">submitted</span>
                                <span className="font-bold text-sky-700">{act.title}</span>
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                {new Date(act.submittedAt).toLocaleString()} • {act.category}
                            </p>
                        </div>
                    </div>
                    <Link href="/admin?tab=submissions" className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase text-slate-400 hover:text-sky-700">Detail</Link>
                </div>
            ))}
        </div>
      </div>
    );
  } else if (currentTab === "settings") {
    const config = await getSiteConfig() as any;
    displayContent = (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border p-8 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight">Global Platform Settings</h2>
          <p className="text-sm text-slate-500">Configure public visibility and platform-wide features.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border flex items-center justify-between group">
                <div className="flex items-center gap-x-4">
                    <div className={`p-3 rounded-xl ${config.isFeedbackFormActive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Expert Feedback Form</p>
                        <p className="text-[10px] text-slate-500 font-medium">Allow users to leave feedback on articles.</p>
                    </div>
                </div>
                <form action={toggleFeedbackForm}>
                    <button type="submit" className={`p-1 rounded-full transition-all ${config.isFeedbackFormActive ? 'text-sky-700' : 'text-slate-300'}`}>
                        <ToggleIcon className={`w-12 h-12 ${config.isFeedbackFormActive ? '' : 'rotate-180 opacity-50'}`} />
                    </button>
                </form>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Admin Core</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Operational Control Center & Visibility</p>
        </div>
        <div className="flex items-center gap-x-3">
            <Link 
              href="/admin?tab=settings" 
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl"
            >
                Global Settings
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border shadow-sm hover:shadow-lg transition-all group overflow-hidden relative">
            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</h3>
            </div>
            <stat.icon className={`absolute right-[-10px] bottom-[-10px] w-20 h-20 opacity-5 group-hover:opacity-10 transition-all ${stat.color}`} />
          </div>
        ))}
      </div>

      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 gap-x-8 mb-6">
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "submissions", label: "Submissions", icon: Clock },
          { id: "users", label: "User Control", icon: Users },
          { id: "activity", label: "Activity Log", icon: BarChart3 },
          { id: "settings", label: "Global Settings", icon: Settings }
        ].map((tab) => (
          <Link
            key={tab.id}
            href={`/admin?tab=${tab.id}`}
            className={`flex items-center gap-x-2 pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
              currentTab === tab.id 
              ? "text-sky-700" 
              : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {currentTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-sky-700 rounded-t-full animate-in slide-in-from-bottom-1 duration-300" />
            )}
          </Link>
        ))}
      </div>

      <div className="min-h-[400px]">
        {displayContent}
      </div>
    </div>
  );
}
