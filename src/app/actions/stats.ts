"use server";

import dbConnect from "@/lib/db";
import Resource from "@/models/Resource";
import Review from "@/models/Review";
import { revalidatePath } from "next/cache";

export async function incrementView(id: string) {
  try {
    await dbConnect();
    await Resource.findByIdAndUpdate(id, { $inc: { views: 1 } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to increment view:", error);
    return { success: false };
  }
}

export async function incrementDownload(id: string) {
  try {
    await dbConnect();
    await Resource.findByIdAndUpdate(id, { $inc: { downloads: 1 } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to increment download:", error);
    return { success: false };
  }
}

export async function submitReview(resourceId: string, user: string, rating: number, comment: string) {
  try {
    await dbConnect();

    // 1. Create the review
    await Review.create({
      resourceId,
      user,
      rating,
      comment
    });

    // 2. Update the Resource stats
    const resource = await Resource.findById(resourceId);
    if (!resource) throw new Error("Resource not found");

    const rootTotalRatings = resource.totalRatings || 0;
    const rootSumRatings = resource.sumRatings || 0;

    const newTotalRatings = rootTotalRatings + 1;
    const newSumRatings = rootSumRatings + rating;
    const newAverageRating = Number((newSumRatings / newTotalRatings).toFixed(1));

    await Resource.findByIdAndUpdate(resourceId, {
      totalRatings: newTotalRatings,
      sumRatings: newSumRatings,
      rating: newAverageRating,
      reviewsCount: newTotalRatings // Keeping reviewsCount in sync
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit review:", error);
    return { success: false, error: (error as Error).message };
  }
}
