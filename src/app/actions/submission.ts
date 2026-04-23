"use server";

import Resource from "@/models/Resource";
import Submission from "@/models/Submission";
import Article from "@/models/Article";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function submitResource(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const link = formData.get("link") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const featuresRaw = formData.get("features") as string;
    const features = featuresRaw ? featuresRaw.split(",").map(f => f.trim()) : [];

    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const isAdmin = (session.user as any).role === "admin";

    // Non-admins can only have one pending submission at a time
    if (!isAdmin) {
      const existingPending = await Submission.findOne({ 
        userId: (session.user as any).id, 
        status: "pending" 
      });
      
      if (existingPending) {
        throw new Error("You already have a pending submission. Please wait for admin approval.");
      }
    }

    const submission = await Submission.create({
      userId: (session.user as any).id,
      title,
      description,
      ownerName: (session.user as any).name,
      category,
      link,
      contactEmail,
      features,
      status: isAdmin ? "approved" : "pending"
    });

    if (isAdmin) {
      // Create Resource directly
      await Resource.create({
        title: submission.title,
        description: submission.description,
        owner: submission.ownerName,
        category: submission.category,
        type: "Free",
        downloadLink: submission.link,
        slug: submission.title.toLowerCase().replace(/ /g, "-") + "-" + Date.now(),
      });
      
      revalidatePath("/" + submission.category.toLowerCase());
      revalidatePath("/admin");
      return redirect("/contribute?success=direct");
    }
    
    revalidatePath("/admin");
    return redirect("/contribute?success=true");
  } catch (error: any) {
    console.error("Submission error:", error);
    return { success: false, error: error.message };
  }
}

export async function approveSubmission(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await dbConnect();
    const submission = await Submission.findById(id);
    if (!submission) throw new Error("Submission not found");

    // Create Resource
    await Resource.create({
      title: submission.title,
      description: submission.description,
      owner: submission.ownerName,
      category: submission.category,
      type: "Free",
      downloadLink: submission.link,
      slug: submission.title.toLowerCase().replace(/ /g, "-") + "-" + Date.now(),
      contactEmail: submission.contactEmail,
      features: submission.features,
    });

    // Create Expert Talking Article
    await Article.create({
      title: `${submission.ownerName}'s ${submission.title} is now Live on BusyLoss!`,
      author: "Shubham Kumar (Founder)",
      content: `We are excited to announce that ${submission.ownerName} has contributed a new tool: ${submission.title}. ${submission.description}. This tool is now available in our ${submission.category} section. We welcome ${submission.ownerName} as a permanent member of the BusyLoss community.`,
      slug: `new-contribution-${submission.title.toLowerCase().replace(/ /g, "-")}-${Date.now()}`,
      date: new Date()
    });

    // Update Submission status
    submission.status = "approved";
    submission.processedAt = new Date();
    await submission.save();

    revalidatePath("/admin");
    revalidatePath("/expert");
    revalidatePath("/" + submission.category.toLowerCase());
  } catch (error: any) {
    console.error("Approval error:", error);
  }
}

export async function rejectSubmission(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await dbConnect();
    await Submission.findByIdAndUpdate(id, { 
      status: "rejected", 
      processedAt: new Date() 
    });
    revalidatePath("/admin");
  } catch (error: any) {
    console.error("Rejection error:", error);
  }
}
