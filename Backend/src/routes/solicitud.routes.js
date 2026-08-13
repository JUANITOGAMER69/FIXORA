import { Router } from "express";

import solicitudController from "../controllers/solicitud.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import tecnicoMiddleware from "../middlewares/tecnicoMiddleware.js";
const router = Router();

// Crear solicitud
router.post(
    "/",
    authMiddleware,
    solicitudController.crear
);

// Obtener todas
router.get("/", solicitudController.obtenerTodas);

// Por cliente
router.get("/cliente/:clienteId", solicitudController.obtenerPorCliente);

// Por técnico
router.get("/tecnico/:tecnicoId", solicitudController.obtenerPorTecnico);

// Obtener por ID (siempre al final)
router.get("/:id", solicitudController.obtenerPorId);
// Cambiar estado
router.put(
    "/:id/estado",
    authMiddleware,
    tecnicoMiddleware,
    solicitudController.cambiarEstado
);

// Eliminar
router.delete("/:id", solicitudController.eliminar);
router.put(
    "/:id/aceptar",
    authMiddleware,
    tecnicoMiddleware,
    solicitudController.aceptar
);
export default router;