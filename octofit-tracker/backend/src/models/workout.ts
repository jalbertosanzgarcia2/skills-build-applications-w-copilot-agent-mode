import mongoose, { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  userId: mongoose.Types.ObjectId | string;
  title: string;
  focus: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<WorkoutDocument>('Workout', workoutSchema);
