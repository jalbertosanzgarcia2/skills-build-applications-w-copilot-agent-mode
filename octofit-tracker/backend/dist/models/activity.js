import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: false },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, required: false },
    caloriesBurned: { type: Number, required: true },
    startedAt: { type: Date, required: true }
});
export default model('Activity', activitySchema);
