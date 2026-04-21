import { ResourceCard } from "@/components/resource-card";
import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { TopCreators } from "@/components/home/top-creators";
import dbConnect from "@/lib/db";
import Resource from "@/models/Resource";
import User from "@/models/User";
import Link from "next/link";
import { ExploreTools } from "@/components/home/explore-tools";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  // Removed redirect - allowed home discovery for all users

  await dbConnect();

  // Parallel data fetching for performance
  const [
    latestResources,
    trendingResources,
    statsData,
    creatorStats,
    totalUsers,
    allResources
  ] = await Promise.all([
    // Latest uploads
    Resource.find().sort({ uploadDate: -1 }).limit(8).lean(),
    // Trending resources
    Resource.find().sort({ views: -1, downloads: -1 }).limit(3).lean(),
    // Global stats aggregation
    Resource.aggregate([
        { $group: { 
            _id: null, 
            totalViews: { $sum: "$views" }, 
            totalProjects: { $sum: 1 } 
        }}
    ]),
    // Top creators aggregation
    Resource.aggregate([
        { $group: { 
            _id: "$owner", 
            totalViews: { $sum: "$views" }, 
            projects: { $sum: 1 } 
        }},
        { $sort: { totalViews: -1 } },
        { $limit: 3 }
    ]),
    // Total users
    User.countDocuments(),
    // All resources for Explorer (limited for performance)
    Resource.find().sort({ uploadDate: -1 }).limit(100).lean()
  ]);

  const globalStats = statsData[0] || { totalViews: 0, totalProjects: 0 };
  const topCreators = creatorStats.map((c: any) => ({
      name: c._id,
      email: "",
      impact: c.totalViews > 1000 ? (c.totalViews/1000).toFixed(1) + "K+" : c.totalViews.toString(),
      uploads: c.projects
  }));

  return (
    <div className="min-h-screen">
      <Hero />
      
      <StatsSection 
        downloads={globalStats.totalViews > 1000 ? (globalStats.totalViews/1000).toFixed(1) + "K+" : globalStats.totalViews.toString()} 
        projects={globalStats.totalProjects.toString()} 
        creators={totalUsers.toString()} 
      />

      {/* Trending Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex items-center gap-x-3 mb-8">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
                    <Flame className="w-5 h-5 fill-current" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Trending Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trendingResources.map((res: any) => (
                    <ResourceCard 
                        key={res._id.toString()}
                        id={res._id.toString()}
                        title={res.title}
                        description={res.description}
                        owner={res.owner}
                        type={res.type}
                        category={res.category}
                        downloadLink={res.downloadLink}
                        slug={res.slug}
                        uploadDate={new Date(res.uploadDate)}
                        views={res.views || 0}
                        downloads={res.downloads || 0}
                    />
                ))}
            </div>
        </div>
      </section>

       <CategoriesGrid />

      {/* Advanced Discovery Hub */}
      <section id="explore" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
            <ExploreTools initialResources={JSON.parse(JSON.stringify(allResources))} />
        </div>
      </section>

      {/* Latest Uploads Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    <div className="p-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 rounded-xl">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Latest Uploads</h2>
                </div>
                <Link href="/windows" className="text-xs font-black uppercase tracking-widest text-sky-600 hover:underline flex items-center gap-x-2">
                    View All <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestResources.map((res: any) => (
                    <ResourceCard 
                        key={res._id.toString()}
                        id={res._id.toString()}
                        title={res.title}
                        description={res.description}
                        owner={res.owner}
                        type={res.type}
                        category={res.category}
                        downloadLink={res.downloadLink}
                        slug={res.slug}
                        uploadDate={new Date(res.uploadDate)}
                        views={res.views || 0}
                        downloads={res.downloads || 0}
                    />
                ))}
            </div>
        </div>
      </section>

      <HowItWorks />

      <TopCreators creators={topCreators} />

      <section className="py-24 px-6 md:pb-40">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-600 to-indigo-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="relative z-10 space-y-6">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Ready to Contribute?</h2>
                  <p className="text-sky-100 font-medium max-w-xl mx-auto">Join hundreds of creators and share your professional tools with the BusyLoss community today.</p>
                  <div className="pt-4">
                      <Link href="/contribute" className="inline-block bg-white text-sky-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                          Submit Your Project Now
                      </Link>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
