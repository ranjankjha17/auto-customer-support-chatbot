import mongoose, { Document, Schema } from 'mongoose';

export interface IQuery extends Document {
  content: string;
  response?: string;
  timestamp: Date;
  urgency: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;
}

const QuerySchema: Schema = new Schema({
  content: { type: String, required: true },
  response: { type: String },
  timestamp: { type: Date, default: Date.now },
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  metadata: { type: Schema.Types.Mixed }
});

export default mongoose.model<IQuery>('Query', QuerySchema);