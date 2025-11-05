import express from 'express';
import { registrarConductor, perfilConductor } from '../controllers/conductorController.js';

const router = express.Router();

router.post('/registro', registrarConductor);
router.get('/listar', perfilConductor);

export default router;