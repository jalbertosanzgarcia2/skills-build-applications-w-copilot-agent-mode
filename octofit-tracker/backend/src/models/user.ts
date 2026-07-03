import mongoose, { Schema, model } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  teamId?: mongoose.Types.ObjectId | string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: false },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<UserDocument>('User', userSchema);
