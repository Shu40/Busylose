import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  title: string;
  description: string;
  category: 'Windows' | 'Linux' | 'Website' | 'Android';
  ownerName: string;
  link: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  processedAt?: Date;
  views: number;
  downloads: number;
  contactEmail: string;
  features: string[];
}

const SubmissionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Windows', 'Linux', 'Website', 'Android'] 
  },
  ownerName: { type: String, required: true },
  link: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  contactEmail: { type: String },
  features: [{ type: String }],
});

export default mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
