"use client";

import { 
  Home, 
  Globe, 
  Smartphone, 
  Monitor, 
  Terminal, 
  Info, 
  HelpCircle, 
  LayoutDashboard,
  LayoutGrid,
  PlusCircle,
  Search,
  BookOpen,
  User as UserIcon
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const routes = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Globe,
    label: "Website Code",
    href: "/websites",
  },
  {
    icon: Smartphone,
    label: "Android APK",
    href: "/android",
  },
  {
    icon: Monitor,
    label: "Windows Software",
    href: "/windows",
  },
  {
    icon: Terminal,
    label: "Linux Tools",
    href: "/linux",
  },
  {
    icon: Info,
    label: "About",
    href: "/about",
  },
  {
    icon: HelpCircle,
    label: "Support",
    href: "/support",
  },
  {
    icon: PlusCircle,
    label: "Contribution",
    href: "/contribute",
  },
  {
    icon: BookOpen,
    label: "Expert Talking",
    href: "/expert",
  },
  {
    icon: LayoutGrid,
    label: "Dashboard",
    href: "/dashboard",
  },
];

const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: "Admin Panel",
    href: "/admin",
  },
];

export function Sidebar() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-[var(--card)] border-[var(--border)] shadow-sm">
      <div className="p-6 flex items-center gap-x-2">
        <h1 className="text-xl font-black text-[#2563EB] uppercase tracking-tighter">BusyLoss</h1>
      </div>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
      <div className="mt-auto flex flex-col w-full border-t pt-4">
        {isAdmin && adminRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
        {session && (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 py-4 transition-all hover:text-slate-600 hover:bg-slate-300/20 w-full"
          >
            <LogOut size={22} className="text-slate-500" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
