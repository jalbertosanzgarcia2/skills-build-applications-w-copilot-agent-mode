import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (req, res) => {
  const teams = await Team.find().lean();
  res.json({ message: 'Teams endpoint', data: teams });
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).lean();
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json({ message: 'Get team', data: team });
});

export default router;
