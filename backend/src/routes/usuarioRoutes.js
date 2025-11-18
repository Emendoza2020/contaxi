import express from 'express';
import {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    perfilUsuario,
} from '../controllers/usuarioController.js';
import { verifyToken, checkRole } from '../middlewares/authJwt.js';

const router = express.Router();

router.post('/', verifyToken, checkRole(['admin']), createUsuario);
router.put('/:id', verifyToken, checkRole(['admin']), updateUsuario);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteUsuario);

router.get('/', verifyToken, getUsuarios);
router.get('/:id', verifyToken, getUsuarioById);

router.get('/:id', verifyToken, perfilUsuario);

export default router;