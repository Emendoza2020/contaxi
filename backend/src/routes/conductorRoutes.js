import express from 'express';
import { registrarConductor } from '../controllers/conductorController.js';

const router = express.Router();

router.post('/register-conductor', registrarConductor);


export default router;