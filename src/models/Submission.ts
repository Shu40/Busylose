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
  securityScan?: {
    isHttps: boolean;
    hasHsts: boolean;
    hasCsp: boolean;
    hasXFrame: boolean;
    hasXContentType: boolean;
    riskLevel: 'high' | 'middle' | 'no';
    details: string;
  };
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
  securityScan: {
    isHttps: { type: Boolean },
    hasHsts: { type: Boolean },
    hasCsp: { type: Boolean },
    hasXFrame: { type: Boolean },
    hasXContentType: { type: Boolean },
    riskLevel: { 
      type: String, 
      enum: ['high', 'middle', 'no'],
      default: 'no'
    },
    details: { type: String }
  }
});

export default mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
