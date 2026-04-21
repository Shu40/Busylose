import { ResourceCard } from "@/components/resource-card";
import CategoryHeader from "@/components/category-header";
import dbConnect from "@/lib/db";
import Resource from "@/models/Resource";
import User from "@/models/User";
import { Metadata } from "next";
import { Monitor, Search } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Windows Software",
  description: "Browse high-quality Windows software and tools on BusyLoss.",
};

export default async function WindowsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const session = await getServerSession(authOptions);
  
  await dbConnect();
  const { q } = await searchParams;
  const query = q || "";
  const filter: any = { category: "Windows" };
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } }
    ];
  }
  const resources = await Resource.find(filter).sort({ uploadDate: -1 }).lean();
  
  let bookmarks: string[] = [];
  if (session && session.user) {
      const user = await User.findById((session.user as any).id);
      bookmarks = user?.bookmarks.map((id: any) => id.toString()) || [];
  }

  return (
    <div className="p-6 space-y-6">
      <CategoryHeader 
        title="Windows Software"
        description="Premium tools and essential utilities verified for Windows 10 & 11 pro users."
        iconName="Monitor"
        color="sky"
        count={resources.length}
      />

      <form className="flex gap-4">
        <div className="flex-1 relative">
            <input 
                name="q"
                type="text" 
                placeholder="Search resources..." 
                defaultValue={query}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:border-sky-600 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
        <button className="px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-bold hover:bg-sky-700 transition-colors">Search</button>
      </form>

      {resources.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
          <p className="font-medium uppercase tracking-widest text-[10px] font-black">No resources found in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {resources.map((res: any) => (
             <ResourceCard 
              key={res._id.toString()}
              id={res._id.toString()}
              title={res.title}
              description={res.description}
              owner={res.owner}
              type={res.type}
              category="Windows"
              downloadLink={res.downloadLink}
              slug={res.slug}
              uploadDate={new Date(res.uploadDate)}
              views={res.views || 0}
              downloads={res.downloads || 0}
              features={res.features || []}
              isBookmarked={bookmarks.includes(res._id.toString())}
            />
          ))}
        </div>
      )}
    </div>
  );
}
