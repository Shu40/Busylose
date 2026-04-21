"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function toggleUserBlock(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== "admin") {
      throw new Error("Unauthorized");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.isBlocked = !user.isBlocked;
    await user.save();

    revalidatePath("/admin");
  } catch (error: any) {
    console.error("Toggle block error:", error);
  }
}

export async function approveUser(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") throw new Error("Unauthorized");

    await User.findByIdAndUpdate(userId, { isApproved: true });
    revalidatePath("/admin");
  } catch (error: any) {
    console.error("Approve user error:", error);
  }
}

export async function rejectUser(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") throw new Error("Unauthorized");

    await User.findByIdAndDelete(userId);
    revalidatePath("/admin");
  } catch (error: any) {
    console.error("Reject user error:", error);
  }
}

export async function getUsers() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== "admin") {
      throw new Error("Unauthorized");
    }

    return await User.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    return [];
  }
}
