import mongoose, { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  description: string;
  memberIds: Array<mongoose.Types.ObjectId | string>;
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
});

export default model<TeamDocument>('Team', teamSchema);
