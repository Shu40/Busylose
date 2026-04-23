import { ResourceCard } from "@/components/resource-card";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, User as UserIcon, Calendar, Heart, Globe } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";
import { getSiteConfig } from "@/app/actions/config";
import { ExpertChat } from "@/components/expert/ExpertChat";
import { getExpertMessages } from "@/app/actions/chat";
import User from "@/models/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Expert Talking",
  description: "Insights and articles from software experts on BusyLoss.",
};

export default async function ExpertTalkingPage() {
  const session = await getServerSession(authOptions);
  await dbConnect();
  
  const [articles, config, messagesData, adminUser] = await Promise.all([
    Article.find().sort({ date: -1 }).lean(),
    getSiteConfig(),
    getExpertMessages(),
    User.findOne({ role: 'admin' }).select('_id').lean() as any
  ]);

  const adminId = adminUser?._id?.toString() || "";

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12 mb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Expert Talking</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          In-depth articles, industry insights, and software guides shared by experts.
        </p>
      </div>

      {(config as any).isFeedbackFormActive && (
        <div className="animate-in slide-in-from-top-10 duration-700">
            <FeedbackForm />
        </div>
      )}

      {articles.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No articles have been posted yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(articles as any[]).map((article) => (
            <div key={article._id.toString()} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border hover:shadow-xl transition-all p-6">
              <h2 className="text-2xl font-bold group-hover:text-sky-700 transition-colors mb-4 line-clamp-2">{article.title}</h2>
              <div className="flex items-center gap-x-4 mb-6 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-x-1">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-widest">{article.author}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(article.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl italic text-sm">
                {article.content.substring(0, 200)}...
              </p>
              <div className="flex items-center justify-between">
                  <Link 
                    href={`/expert/${article.slug}`}
                    className="inline-flex items-center font-black text-xs uppercase tracking-widest text-sky-700 hover:gap-x-2 transition-all"
                  >
                    Read Full Article →
                  </Link>
                  <Heart className="w-4 h-4 text-slate-200 group-hover:text-red-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
      {(articles as any[]).length > 0 && (
        <div className="pt-12 border-t border-slate-100 dark:border-slate-800 space-y-8">
          <div className="flex items-center gap-x-3">
             <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
               <Globe className="w-5 h-5" />
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Community Hub</h2>
          </div>
          <ExpertChat initialMessages={messagesData.messages} adminId={adminId} />
        </div>
      )}
    </div>
  );
}
