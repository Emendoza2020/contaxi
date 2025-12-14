import express from 'express';
import { registrarConductor, perfilConductor, validateCI, validateEmail, obtenerConductores } from '../controllers/conductorController.js';

const router = express.Router();

router.post('/registro', registrarConductor);
router.get('/listar', obtenerConductores);

router.post('/validate-ci', validateCI);
router.post('/validate-email', validateEmail);

export default router;