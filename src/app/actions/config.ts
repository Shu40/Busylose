"use server";

import dbConnect from "@/lib/db";
import SiteConfig from "@/models/SiteConfig";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function toggleFeedbackForm() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      throw new Error("Unauthorized");
    }

    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create({ isFeedbackFormActive: true });
    } else {
      config.isFeedbackFormActive = !config.isFeedbackFormActive;
      config.updatedAt = new Date();
      await config.save();
    }

    revalidatePath("/admin");
    revalidatePath("/expert");
  } catch (error: any) {
    console.error("Toggle feedback error:", error);
  }
}

export async function getSiteConfig() {
  try {
    await dbConnect();
    let config = await SiteConfig.findOne().lean();
    if (!config) {
      return { isFeedbackFormActive: false };
    }
    return config;
  } catch (error) {
    return { isFeedbackFormActive: false };
  }
}
