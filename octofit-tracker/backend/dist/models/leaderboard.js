import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    position: { type: Number, required: true },
    points: { type: Number, required: true },
    lastUpdated: { type: Date, default: () => new Date() }
});
export default model('Leaderboard', leaderboardSchema);
