import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (req, res) => {
    const activities = await Activity.find().lean();
    res.json({ message: 'Activities endpoint', data: activities });
});
router.get('/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id).lean();
    if (!activity)
        return res.status(404).json({ error: 'Activity not found' });
    res.json({ message: 'Get activity', data: activity });
});
export default router;
