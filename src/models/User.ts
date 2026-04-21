import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'admin' | 'user';
  isApproved: boolean;
  isBlocked: boolean;
  createdAt: Date;
  bio?: string;
  skills: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  bookmarks: string[];
  earnings: number;
  badges: string[];
  loginHistory: {
    date: Date;
    ip: string;
    device: string;
  }[];
  theme: 'light' | 'dark' | 'hacker';
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  role: { 
    type: String, 
    required: true, 
    enum: ['admin', 'user'],
    default: 'user'
  },
  isApproved: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  bio: { type: String, default: "" },
  skills: [{ type: String }],
  socialLinks: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    portfolio: { type: String, default: "" },
  },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  earnings: { type: Number, default: 0 },
  badges: [{ type: String }],
  loginHistory: [{
    date: { type: Date, default: Date.now },
    ip: { type: String },
    device: { type: String },
  }],
  theme: { type: String, enum: ['light', 'dark', 'hacker'], default: 'light' },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
