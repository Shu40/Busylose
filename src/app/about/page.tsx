export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">About BusyLoss</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">
          The ultimate platform for developers, system administrators, and tech enthusiasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-sky-700">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            BusyLoss was founded with a single goal: to provide a centralized, safe, and community-driven hub for high-quality software, tools, and website source code. 
            We believe in empowering users to share their creations while ensuring that everyone has access to the best productivity enhancements.
          </p>
        </div>
        <div className="bg-sky-700/5 dark:bg-sky-400/5 p-8 rounded-3xl border border-sky-200/20">
          <ul className="space-y-4">
            <li className="flex items-center gap-x-3 text-slate-700 dark:text-slate-300 font-bold">
              <div className="w-2 h-2 rounded-full bg-sky-700" />
              Verified Submissions
            </li>
            <li className="flex items-center gap-x-3 text-slate-700 dark:text-slate-300 font-bold">
              <div className="w-2 h-2 rounded-full bg-indigo-700" />
              Community Driven
            </li>
            <li className="flex items-center gap-x-3 text-slate-700 dark:text-slate-300 font-bold">
              <div className="w-2 h-2 rounded-full bg-purple-700" />
              Expert Insights
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 dark:bg-slate-800 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
          <p className="text-slate-400 mb-8 max-w-2xl font-medium">
            Started as a small project, BusyLoss has grown into a production-level ecosystem. We continue to evolve every day, adding new categories and features to serve you better.
          </p>
          <div className="flex gap-8">
            <div>
              <div className="text-4xl font-black text-sky-400">5k+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mt-1">Tools Shared</div>
            </div>
            <div className="border-l border-slate-700 px-8">
              <div className="text-4xl font-black text-sky-400">10k+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mt-1">Active Users</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[120px] rounded-full -translate-y-12 translate-x-12" />
      </div>
    </div>
  );
}
