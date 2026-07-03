import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() }
});
export default model('Team', teamSchema);
