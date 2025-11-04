import express from 'express';
import {
    createRol,
    getRoles,
    getRolById,
    updateRol,
    deleteRol,
} from '../controllers/rolController.js';
import { verifyToken, checkRole } from '../middlewares/authJwt.js';

const router = express.Router();

router.post('/', verifyToken, checkRole(['admin']), createRol);
router.put('/:id', verifyToken, checkRole(['admin']), updateRol);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteRol);

router.get('/', verifyToken, getRoles);
router.get('/:id', verifyToken, getRolById);

export default router;