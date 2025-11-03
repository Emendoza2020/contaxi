import express from 'express';
import { listarPersonas, crearPersona, actualizarPersona, eliminarPersona } from '../controllers/personaController.js';
import { verificarToken, verificarRol } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verificarToken, listarPersonas);
router.post('/', verificarToken, verificarRol('Administrador'), crearPersona);
router.put('/:id', verificarToken, verificarRol('Administrador'), actualizarPersona);
router.delete('/:id', verificarToken, verificarRol('Administrador'), eliminarPersona);

export default router;