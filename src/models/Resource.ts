import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  description: string;
  owner: string;
  category: 'Windows' | 'Linux' | 'Website' | 'Android';
  type: 'Free' | 'Paid' | 'Open-source';
  downloadLink: string;
  uploadDate: Date;
  slug: string;
  views: number;
  downloads: number;
  uptime: string;
  contactEmail: string;
  features: string[];
  rating: number;
  reviewsCount: number;
  price: number;
}

const ResourceSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Windows', 'Linux', 'Website', 'Android'] 
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['Free', 'Paid', 'Open-source'] 
  },
  downloadLink: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  slug: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  uptime: { type: String, default: "100%" },
  contactEmail: { type: String },
  features: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
});

export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);
