import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Submission from "@/models/Submission";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, ownerName, link } = body;

    if (!title || !description || !category || !ownerName || !link) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    await dbConnect();

    const submission = await Submission.create({
      title,
      description,
      category,
      ownerName,
      link,
      status: "pending",
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.log("[CONTRIBUTE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
