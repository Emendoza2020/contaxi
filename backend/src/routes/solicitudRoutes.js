import express from 'express';
import { listarSolicitudes, crearSolicitud, actualizarSolicitud, eliminarSolicitud, obtenerSolicitudesParaConductor } from '../controllers/solicitudController.js';
import { verificarToken, verificarRol } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verificarToken, verificarRol('Administrador', 'Conductor'), listarSolicitudes);
router.post('/', verificarToken, verificarRol('Pasajero'), crearSolicitud);
router.put('/:id', verificarToken, verificarRol('Administrador', 'Conductor'), actualizarSolicitud);
router.delete('/:id', verificarToken, verificarRol('Administrador'), eliminarSolicitud);

router.get('/solicitud-viaje', verificarToken, verificarRol('Conductor'), obtenerSolicitudesParaConductor);

export default router;