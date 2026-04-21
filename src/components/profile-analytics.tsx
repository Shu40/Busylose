"use client";

import { cn } from "@/lib/utils";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { BarChart3, TrendingUp, Users, Target } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { getAnalyticsData } from "@/app/actions/profile";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ProfileAnalyticsProps {
  initialData: {
    labels: string[];
    downloads: number[];
    views: number[];
  };
  toolStats: any[];
}

export default function ProfileAnalytics({ initialData, toolStats }: ProfileAnalyticsProps) {
  const [data, setData] = useState(initialData);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (period !== 'week') { // Skip first load as we have initialData
        const fetchData = async () => {
            setLoading(true);
            const res = await getAnalyticsData(period);
            setData(res);
            setLoading(false);
        };
        fetchData();
    }
  }, [period]);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Interactions",
        data: data.downloads,
        borderColor: "rgb(14, 165, 233)",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Views",
        data: data.views,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        padding: 12,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: { size: 12, weight: "bold" as any },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          font: { size: 10, weight: "bold" as any },
          color: "#94a3b8",
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 10, weight: "bold" as any },
          color: "#94a3b8",
        }
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Analytics Hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard icon={TrendingUp} label="Daily Growth" value="+24%" color="sky" />
        <AnalyticsCard icon={Users} label="Unique Reach" value="1.2K" color="indigo" />
        <AnalyticsCard icon={Target} label="Conversion Rate" value="12%" color="emerald" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative">
        {loading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[2px] z-50 flex items-center justify-center rounded-[2.5rem]">
                <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
            </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Performance Chart</h3>
                <p className="text-slate-500 font-medium text-sm">Real-time interaction trends for your contributed tools.</p>
            </div>
            
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                {(['day', 'week', 'month', 'year'] as const).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            period === p 
                                ? "bg-white dark:bg-slate-700 text-sky-600 shadow-sm" 
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="h-[350px]">
          <Line data={chartData} options={options} />
        </div>
      </div>

      {/* Resource Performance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Resource Performance</h3>
            <p className="text-slate-500 font-medium text-sm">Individual metrics for your approved tools.</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Tool Name</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Views</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Pulse</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {toolStats.map((tool) => (
                        <tr key={tool.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">{tool.title}</td>
                            <td className="px-8 py-5">
                                <span className="px-2 py-1 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-sky-100/50">
                                    {tool.category}
                                </span>
                            </td>
                            <td className="px-8 py-5 text-right font-black text-slate-900 dark:text-white">{tool.views}</td>
                            <td className="px-8 py-5 text-right font-black text-indigo-600">{tool.downloads}</td>
                        </tr>
                    ))}
                    {toolStats.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-8 py-10 text-center text-slate-400 italic">No approved tools to track yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg flex items-center gap-x-5">
            <div className={cn(
                "p-4 rounded-2xl",
                color === "sky" && "bg-sky-50 text-sky-600 dark:bg-sky-900/30",
                color === "indigo" && "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30",
                color === "emerald" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30",
            )}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
            </div>
        </div>
    )
}
