import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (req, res) => {
  const leaderboard = await Leaderboard.find().populate('teamId').lean();
  res.json({ message: 'Leaderboard endpoint', data: leaderboard });
});

export default router;
