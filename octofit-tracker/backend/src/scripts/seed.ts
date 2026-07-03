import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.create([
      { name: 'Marathon Masters', description: 'Long-distance runners pushing pace', memberIds: [] },
      { name: 'Iron Gym Alliance', description: 'Strength-focused training groups', memberIds: [] },
    ]);

    const users = await User.create([
      { name: 'Ava Martinez', email: 'ava@octofit.io', role: 'coach', teamId: teams[0]._id.toString() },
      { name: 'Noah Brooks', email: 'noah@octofit.io', role: 'member', teamId: teams[0]._id.toString() },
      { name: 'Mia Patel', email: 'mia@octofit.io', role: 'member', teamId: teams[1]._id.toString() },
      { name: 'Ethan Chen', email: 'ethan@octofit.io', role: 'admin', teamId: teams[1]._id.toString() },
    ]);

    await Team.updateOne({ _id: teams[0]._id }, { $set: { memberIds: [users[0]._id, users[1]._id] } });
    await Team.updateOne({ _id: teams[1]._id }, { $set: { memberIds: [users[2]._id, users[3]._id] } });

    const activities = await Activity.create([
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        type: 'Running',
        durationMinutes: 55,
        distanceKm: 12.5,
        caloriesBurned: 860,
        startedAt: new Date(Date.now() - 48 * 60 * 60_000),
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        type: 'Strength Training',
        durationMinutes: 70,
        caloriesBurned: 610,
        startedAt: new Date(Date.now() - 24 * 60 * 60_000),
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        type: 'HIIT',
        durationMinutes: 30,
        distanceKm: 4.3,
        caloriesBurned: 420,
        startedAt: new Date(Date.now() - 4 * 60 * 60_000),
      },
    ]);

    await Leaderboard.create([
      { teamId: teams[0]._id, position: 1, points: 1480 },
      { teamId: teams[1]._id, position: 2, points: 1375 },
    ]);

    await Workout.create([
      {
        userId: users[1]._id,
        title: 'Endurance Run',
        focus: 'Cardio endurance and pacing',
        durationMinutes: 60,
        difficulty: 'intermediate',
      },
      {
        userId: users[2]._id,
        title: 'Full Body Strength',
        focus: 'Muscle conditioning and stability',
        durationMinutes: 50,
        difficulty: 'advanced',
      },
      {
        userId: users[3]._id,
        title: 'Quick HIIT Circuit',
        focus: 'Intensity and recovery',
        durationMinutes: 30,
        difficulty: 'intermediate',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
