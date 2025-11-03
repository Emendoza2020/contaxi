import express from 'express';
import { listarVehiculos, crearVehiculo, actualizarVehiculo, eliminarVehiculo } from '../controllers/vehiculoController.js';
import { verificarToken, verificarRol } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verificarToken, listarVehiculos);
router.post('/', verificarToken, verificarRol('Conductor', 'Administrador'), crearVehiculo);
router.put('/:id', verificarToken, verificarRol('Conductor', 'Administrador'), actualizarVehiculo);
router.delete('/:id', verificarToken, verificarRol('Administrador'), eliminarVehiculo);

export default router;