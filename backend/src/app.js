import express from 'express';
import cors from 'cors';

import { listarSolicitudes, crearSolicitud, actualizarSolicitud, eliminarSolicitud } from './controllers/solicitudController.js';
import { verificarToken, verificarRol } from './middlewares/authJwt.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/', verificarToken, verificarRol('Administrador', 'Conductor'), listarSolicitudes);
router.post('/', verificarToken, verificarRol('Pasajero'), crearSolicitud);
router.put('/:id', verificarToken, verificarRol('Administrador', 'Conductor'), actualizarSolicitud);
router.delete('/:id', verificarToken, verificarRol('Administrador'), eliminarSolicitud);

export default app;