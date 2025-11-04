import express from 'express';
import { createPersona, getPersonas, getPersonaById, updatePersona, deletePersona } from '../controllers/personaController.js';
import { verifyToken, checkRole } from '../middlewares/authJwt.js';

const router = express.Router();

// Solo admin puede crear, actualizar y eliminar
router.post('/', verifyToken, checkRole(['admin']), createPersona);
router.put('/:id', verifyToken, checkRole(['admin']), updatePersona);
router.delete('/:id', verifyToken, checkRole(['admin']), deletePersona);

// Lectura abierta para usuarios autenticados
router.get('/', verifyToken, getPersonas);
router.get('/:id', verifyToken, getPersonaById);

export default router;