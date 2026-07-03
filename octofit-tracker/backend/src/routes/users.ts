import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find().lean();
  res.json({ message: 'Users endpoint', data: users });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'Get user', data: user });
});

export default router;
