import express from "express";
import {
    registrarPasajero,
    listarPasajeros,
    //obtenerPasajero,
    //actualizarPasajero,
    // eliminarPasajero
} from "../controllers/pasajeroController.js";

const router = express.Router();

// registro publico
router.post("/registro", registrarPasajero);

// Admin
router.get("/listar", listarPasajeros);
//router.get("/:id", obtenerPasajero);
//router.put("/:id", actualizarPasajero);
//router.delete("/:id", eliminarPasajero);

export default router;