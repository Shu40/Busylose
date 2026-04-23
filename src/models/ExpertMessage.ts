import mongoose, { Schema, Document } from "mongoose";

export interface IExpertMessage extends Document {
  content: string;
  senderName: string;
  senderEmail: string;
  isAdmin: boolean;
  recipient: string; // "ALL" for public or User ID for private
  isPublic: boolean;
  createdAt: Date;
}

const ExpertMessageSchema: Schema = new Schema({
  content: { type: String, required: true },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  recipient: { type: String, default: "ALL" },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ExpertMessage || mongoose.model<IExpertMessage>("ExpertMessage", ExpertMessageSchema);
