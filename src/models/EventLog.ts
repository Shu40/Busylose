import mongoose, { Schema, Document } from 'mongoose';

export interface IEventLog extends Document {
  type: 'download' | 'view';
  resourceId: string;
  ownerId: string;
  timestamp: Date;
}

const EventLogSchema: Schema = new Schema({
  type: { type: String, enum: ['download', 'view'], required: true },
  resourceId: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
});

// Index for aggregation
EventLogSchema.index({ ownerId: 1, timestamp: -1 });

export default mongoose.models.EventLog || mongoose.model<IEventLog>('EventLog', EventLogSchema);
