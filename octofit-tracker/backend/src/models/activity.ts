import mongoose, { Schema, model } from 'mongoose';

export interface ActivityDocument {
  userId: mongoose.Types.ObjectId | string;
  teamId?: mongoose.Types.ObjectId | string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  startedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: false },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, required: false },
  caloriesBurned: { type: Number, required: true },
  startedAt: { type: Date, required: true }
});

export default model<ActivityDocument>('Activity', activitySchema);
