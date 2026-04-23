import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  resourceId: mongoose.Types.ObjectId;
  user: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  resourceId: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxLength: 1000 },
  createdAt: { type: Date, default: Date.now },
});

// Avoid duplicate reviews from same user on same resource if possible
// ReviewSchema.index({ resourceId: 1, user: 1 }, { unique: true });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
