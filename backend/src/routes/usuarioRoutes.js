import express from 'express';
import {
    listarUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    actualizarEstado,
    getUsuarios,
    getUsuarioById,
    perfilUsuario,
    validateCI,
    validateEmail

} from '../controllers/usuarioController.js';
import { verifyToken, checkRole } from '../middlewares/authJwt.js';

const router = express.Router();

router.get('/listar', verifyToken, listarUsuario);
router.post('/registrar', verifyToken, crearUsuario);
router.put('/actualizar/:id', verifyToken, actualizarUsuario);
router.delete('/eliminar/:id', verifyToken, eliminarUsuario);
router.put('/estado/:id', verifyToken, actualizarEstado);

//router.put('/:id', verifyToken, checkRole(['admin']), updateUsuario);

router.get('/', verifyToken, getUsuarios);
router.get('/:id', verifyToken, getUsuarioById);

router.get('/:id', verifyToken, perfilUsuario);

router.post('/validate-ci', validateCI);
router.post('/validate-email', validateEmail);


export default router;