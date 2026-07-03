import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: false },
    createdAt: { type: Date, default: () => new Date() }
});
export default model('User', userSchema);
