import express from 'express';
import { obtenerDatosDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', obtenerDatosDashboard);

export default router;