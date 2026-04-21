import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteConfig extends Document {
  isFeedbackFormActive: boolean;
  updatedAt: Date;
}

const SiteConfigSchema: Schema = new Schema({
  isFeedbackFormActive: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.SiteConfig || mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);
