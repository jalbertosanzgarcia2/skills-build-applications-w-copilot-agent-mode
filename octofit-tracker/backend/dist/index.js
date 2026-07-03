import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
dotenv.config();
const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiHost = codespaceName ? `https://${codespaceName}-8000.githubpreview.dev` : `http://localhost:${port}`;
app.use(cors({ origin: ['*'] }));
app.use(express.json());
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        environment: process.env.NODE_ENV || 'development',
        apiHost,
    });
});
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to OctoFit Tracker API',
        apiHost,
    });
});
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
async function startServer() {
    try {
        await connectDatabase();
        app.listen(port, () => {
            console.log(`OctoFit Tracker backend running on ${apiHost}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
