"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import Submission from "@/models/Submission";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import EventLog from "@/models/EventLog";

export async function updateProfile(data: any) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error("Unauthorized");

    const userId = (session.user as any).id;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (data.name) user.name = data.name;
    if (data.bio !== undefined) user.bio = data.bio;
    if (data.skills) user.skills = data.skills;
    if (data.theme) user.theme = data.theme;
    if (data.socialLinks) {
        user.socialLinks = {
            github: data.github || "",
            linkedin: data.linkedin || "",
            portfolio: data.portfolio || ""
        };
    }
    
    if (data.newPassword) {
      user.password = await bcrypt.hash(data.newPassword, 10);
    }

    await user.save();
    revalidatePath("/profile");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleBookmark(resourceId: string) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session || !session.user) throw new Error("Unauthorized");

        const user = await User.findById((session.user as any).id);
        const bookmarks = user.bookmarks.map((id: any) => id.toString());
        
        if (bookmarks.includes(resourceId)) {
            user.bookmarks = user.bookmarks.filter((id: any) => id.toString() !== resourceId);
        } else {
            user.bookmarks.push(resourceId);
        }

        await user.save();
        revalidatePath("/profile");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getUserStats() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error("Unauthorized");

    const userId = (session.user as any).id;
    
    const [approved, rejected, pending] = await Promise.all([
      Submission.countDocuments({ userId, status: "approved" }),
      Submission.countDocuments({ userId, status: "rejected" }),
      Submission.countDocuments({ userId, status: "pending" })
    ]);

    const submissions = await Submission.find({ userId }).sort({ submittedAt: -1 }).lean();
    const user = await User.findById(userId).lean();

    return {
      stats: { approved, rejected, pending, total: approved + rejected + pending },
      submissions: JSON.parse(JSON.stringify(submissions)),
      user: JSON.parse(JSON.stringify(user))
    };
  } catch (error) {
    return null;
  }
}

export async function getAnalyticsData(period: 'day' | 'week' | 'month' | 'year' = 'week') {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session || !session.user) throw new Error("Unauthorized");
        const userId = (session.user as any).id;

        const now = new Date();
        let startDate = new Date();
        let grouping: 'hour' | 'day' | 'month' = 'day';
        let count = 7;

        if (period === 'day') {
            startDate.setHours(startDate.getHours() - 24);
            grouping = 'hour';
            count = 24;
        } else if (period === 'week') {
            startDate.setDate(startDate.getDate() - 7);
            grouping = 'day';
            count = 7;
        } else if (period === 'month') {
            startDate.setDate(startDate.getDate() - 30);
            grouping = 'day';
            count = 30;
        } else if (period === 'year') {
            startDate.setFullYear(startDate.getFullYear() - 1);
            grouping = 'month';
            count = 12;
        }

        const logs = await EventLog.find({
            ownerId: userId,
            timestamp: { $gte: startDate }
        }).sort({ timestamp: 1 }).lean();

        const labels: string[] = [];
        const downloads: number[] = [];
        const views: number[] = [];

        for (let i = count - 1; i >= 0; i--) {
            const d = new Date();
            let label = "";
            let matchFn: (logDate: Date) => boolean;

            if (grouping === 'hour') {
                d.setHours(d.getHours() - i);
                label = d.getHours() + ":00";
                matchFn = (ld) => ld.getHours() === d.getHours() && ld.toDateString() === d.toDateString();
            } else if (grouping === 'day') {
                d.setDate(d.getDate() - i);
                label = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                matchFn = (ld) => ld.toDateString() === d.toDateString();
            } else {
                d.setMonth(d.getMonth() - i);
                label = d.toLocaleDateString('en-US', { month: 'short' });
                matchFn = (ld) => ld.getMonth() === d.getMonth() && ld.getFullYear() === d.getFullYear();
            }

            labels.push(label);
            const dayLogs = logs.filter(l => matchFn(new Date(l.timestamp)));
            downloads.push(dayLogs.filter(l => l.type === 'download').length);
            views.push(dayLogs.filter(l => l.type === 'view').length);
        }

        return { labels, downloads, views };
    } catch (error) {
        return { labels: [], downloads: [], views: [] };
    }
}

export async function getCreatorStats() {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session || !session.user) throw new Error("Unauthorized");
        const userId = (session.user as any).id;

        const submissions = await Submission.find({ userId, status: 'approved' }).lean();
        
        // Enhance with detailed stats
        const toolStats = (submissions as any[]).map(s => ({
            id: s._id.toString(),
            title: s.title,
            category: s.category,
            views: s.views || 0,
            downloads: s.downloads || 0,
            status: s.status,
            date: s.submittedAt
        }));

        return toolStats;
    } catch (error) {
        return [];
    }
}

export async function getSavedTools() {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session || !session.user) throw new Error("Unauthorized");

        const user = await User.findById((session.user as any).id).populate('bookmarks');
        return JSON.parse(JSON.stringify(user.bookmarks || []));
    } catch (error) {
        return [];
    }
}

export async function deleteSubmission(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error("Unauthorized");

    const submission = await Submission.findById(id);
    if (!submission) throw new Error("Submission not found");

    // Only allow owner or admin to delete
    if (submission.userId.toString() !== (session.user as any).id && (session.user as any).role !== 'admin') {
      throw new Error("Unauthorized");
    }

    // If it was already approved, we should also find and delete the Resource
    if (submission.status === 'approved') {
        // We match by title and owner for simplicity, or we could have stored resourceId in submission
        await (require("@/models/Resource").default).deleteOne({ 
            title: submission.title, 
            owner: submission.ownerName 
        });
    }

    await Submission.findByIdAndDelete(id);

    revalidatePath("/profile");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function trackView(submissionId: string) {
    try {
        await dbConnect();
        const sub = await Submission.findByIdAndUpdate(submissionId, { $inc: { views: 1 } }, { new: true });
        
        if (sub) {
            // Log for analytics
            await EventLog.create({
                type: 'view',
                resourceId: sub._id,
                ownerId: sub.userId,
                timestamp: new Date()
            });

            if (sub.status === 'approved') {
                 await (require("@/models/Resource").default).findOneAndUpdate(
                    { title: sub.title, owner: sub.ownerName },
                    { $inc: { views: 1 } }
                );
            }
        }
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function trackDownload(resourceId: string) {
    try {
        await dbConnect();
        const res = await (require("@/models/Resource").default).findByIdAndUpdate(resourceId, { $inc: { downloads: 1 } });
        if (res) {
            const sub = await Submission.findOneAndUpdate(
                { title: res.title, ownerName: res.owner },
                { $inc: { downloads: 1 } },
                { new: true }
            );

            if (sub) {
                 await EventLog.create({
                    type: 'download',
                    resourceId: res._id,
                    ownerId: sub.userId,
                    timestamp: new Date()
                });
            }
        }
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
