// routes/solicitudViaje.routes.js
import { Router } from "express";
import {
    crearSolicitudViaje,
    //listarSolicitudes,
    obtenerSolicitudesParaConductor,
    aceptarSolicitud
} from "../controllers/solicitudViajeController.js";

const router = Router();

// POST /api/solicitudes-viaje
router.post("/crear", crearSolicitudViaje);

router.get("/viajes", obtenerSolicitudesParaConductor);

// GET /api/solicitudes-viaje

router.put('/aceptar', aceptarSolicitud);



export default router;