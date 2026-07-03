import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    createdAt: { type: Date, default: () => new Date() }
});
export default model('Workout', workoutSchema);
