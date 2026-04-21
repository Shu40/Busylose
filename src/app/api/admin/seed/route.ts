import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Resource from "@/models/Resource";
import Article from "@/models/Article";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();

    // Clear existing data (Careful in production!)
    await Resource.deleteMany({});
    await Article.deleteMany({});
    await User.deleteMany({});

    // Create Admin User
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin User",
      email: "admin@busyloss.com",
      password: hashedAdminPassword,
      role: "admin",
    });

    // Create Sample Resources
    await Resource.create([
      {
        title: "BusyLoss Pro Manager",
        description: "The ultimate window management tool for Windows professionals.",
        owner: "BusyLoss Team",
        category: "Windows",
        type: "Free",
        downloadLink: "https://example.com/win-pro",
        slug: "busyloss-pro-manager"
      },
      {
        title: "Ubuntu Optimizer Script",
        description: "Speed up your Ubuntu installation with one click.",
        owner: "LinuxDev",
        category: "Linux",
        type: "Open-source",
        downloadLink: "https://example.com/linux-opt",
        slug: "ubuntu-optimizer-script"
      },
      {
        title: "Modern SaaS Template",
        description: "Next.js 15 template for high-converting landing pages.",
        owner: "WebWizards",
        category: "Website",
        type: "Paid",
        downloadLink: "https://example.com/saas-tpl",
        slug: "modern-saas-template"
      }
    ]);

    // Create Sample Articles
    await Article.create([
      {
        title: "Mastering Next.js 15 App Router",
        author: "DevExpert",
        content: "Next.js 15 brings many improvements to the App Router... (Long content here)",
        slug: "mastering-nextjs-15",
        date: new Date()
      },
      {
        title: "Why SEO Matters in 2026",
        author: "SEOPro",
        content: "Search Engine Optimization is more than just keywords... (Long content here)",
        slug: "why-seo-matters-2026",
        date: new Date()
      }
    ]);

    return NextResponse.json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.log("[SEED_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
