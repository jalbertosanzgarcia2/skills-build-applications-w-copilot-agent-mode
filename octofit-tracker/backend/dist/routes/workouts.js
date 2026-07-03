import { Router } from 'express';
import Workout from '../models/workout.js';
const router = Router();
router.get('/', async (req, res) => {
    const workouts = await Workout.find().lean();
    res.json({ message: 'Workouts endpoint', data: workouts });
});
router.get('/:id', async (req, res) => {
    const workout = await Workout.findById(req.params.id).lean();
    if (!workout)
        return res.status(404).json({ error: 'Workout not found' });
    res.json({ message: 'Get workout', data: workout });
});
export default router;
