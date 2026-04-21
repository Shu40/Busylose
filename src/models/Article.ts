import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  author: string;
  content: string;
  date: Date;
  slug: string;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  slug: { type: String, required: true, unique: true },
});

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
