import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import authUser from '../middleware/auth.js';
import roleAuth from '../middleware/roleAuth.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/stats', authUser, roleAuth(['admin']), getDashboardStats);

export default dashboardRouter;
