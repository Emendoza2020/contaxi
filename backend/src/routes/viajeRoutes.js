import express from 'express';
import { solicitarViaje, obtenerSolicitudesPendientes } from '../controllers/viajeController.js';

const router = express.Router();

// Pasajero solicita viaje
router.post('/solicitar', solicitarViaje);

// Conductor consulta solicitudes pendientes
router.get('/pendientes', obtenerSolicitudesPendientes);

export default router;