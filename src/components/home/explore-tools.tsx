"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Monitor, Terminal, Globe, Smartphone, ArrowUpDown, Zap, TrendingUp, Clock } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { cn } from "@/lib/utils";

interface ExploreToolsProps {
  initialResources: any[];
}

type Category = 'All' | 'Windows' | 'Linux' | 'Android' | 'Website';
type SortOption = 'latest' | 'views' | 'pulse';

export function ExploreTools({ initialResources }: ExploreToolsProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { label: Category; icon: any }[] = [
    { label: 'All', icon: Zap },
    { label: 'Windows', icon: Monitor },
    { label: 'Website', icon: Globe },
    { label: 'Android', icon: Smartphone },
    { label: 'Linux', icon: Terminal },
  ];

  const filteredResources = useMemo(() => {
    let filtered = [...initialResources];

    // Filter by Category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(r => r.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q) ||
        r.owner.toLowerCase().includes(q)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
      if (sortBy === 'pulse') return (b.downloads || 0) - (a.downloads || 0);
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });

    return filtered;
  }, [activeCategory, searchQuery, sortBy, initialResources]);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">Premium Tools</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Explore and filter based on your professional requirements. Filter by category, rank by popularity, or find the latest community contributions.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 p-4 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl">
        {/* Categories Tab */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={cn(
                "flex items-center gap-x-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeCategory === cat.label 
                  ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:w-80">
            <input 
              type="text" 
              placeholder="Search tools, creators, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-3.5 pl-12 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 transition-all outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-700">
             {[
               { id: 'latest', icon: Clock, label: 'Latest' },
               { id: 'views', icon: TrendingUp, label: 'Ranking' },
               { id: 'pulse', icon: Zap, label: 'Pulse' }
             ].map((opt) => (
               <button
                 key={opt.id}
                 onClick={() => setSortBy(opt.id as SortOption)}
                 className={cn(
                   "p-2.5 rounded-xl transition-all",
                   sortBy === opt.id ? "bg-white dark:bg-slate-700 text-sky-600 shadow-sm" : "text-slate-400"
                 )}
                 title={`Sort by ${opt.label}`}
               >
                 <opt.icon className="w-4 h-4" />
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[400px]">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => (
            <div key={res._id} className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                <ResourceCard 
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
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Filter className="w-8 h-8 text-slate-300" />
             </div>
             <div className="space-y-1">
                <p className="text-xl font-black text-slate-400 uppercase">System Analysis Null</p>
                <p className="text-sm text-slate-500 font-medium italic">No tools matching your specific search parameters were found.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
