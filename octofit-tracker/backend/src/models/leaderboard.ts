import mongoose, { Schema, model } from 'mongoose';

export interface LeaderboardDocument {
  teamId: mongoose.Types.ObjectId | string;
  position: number;
  points: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  position: { type: Number, required: true },
  points: { type: Number, required: true },
  lastUpdated: { type: Date, default: () => new Date() }
});

export default model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
