"use server";

import dbConnect from "@/lib/db";
import ExpertMessage from "@/models/ExpertMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function sendExpertMessage(content: string, isPublic: boolean, recipient: string = "ALL") {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: "Authentication required" };
    }

    await dbConnect();
    
    const isAdmin = (session.user as any).role === 'admin';

    await ExpertMessage.create({
      content,
      senderName: session.user.name,
      senderEmail: session.user.email,
      isAdmin,
      recipient: isPublic ? "ALL" : recipient,
      isPublic,
    });

    revalidatePath("/expert");
    return { success: true };
  } catch (error) {
    console.error("Failed to send message:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function getExpertMessages() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: "Authentication required", messages: [] };
    }

    await dbConnect();
    
    const isAdmin = (session.user as any).role === 'admin';
    const userEmail = session.user.email;

    let query;
    if (isAdmin) {
      // Admins see all public messages and all private messages
      query = {};
    } else {
      // Users see all public messages AND private messages where they are sender or recipient
      query = {
        $or: [
          { isPublic: true },
          { senderEmail: userEmail },
          { recipient: (session.user as any).id }
        ]
      };
    }

    const messages = await ExpertMessage.find(query).sort({ createdAt: 1 }).lean();
    
    return { 
      success: true, 
      messages: JSON.parse(JSON.stringify(messages)) 
    };
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return { success: false, error: "Internal server error", messages: [] };
  }
}

export async function deleteExpertMessage(messageId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    await ExpertMessage.findByIdAndDelete(messageId);
    
    revalidatePath("/expert");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false, error: "Internal server error" };
  }
}
