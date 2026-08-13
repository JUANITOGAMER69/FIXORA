import { Router } from "express";

import trabajoController from "../controllers/trabajo.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import tecnicoMiddleware from "../middlewares/tecnicoMiddleware.js";

const router = Router();

// Crear trabajo

router.post(
    "/",
    trabajoController.crear
);

// Obtener todos

router.get(
    "/",
    trabajoController.obtenerTodos
);

// Obtener uno

router.get(
    "/:id",
    trabajoController.obtenerPorId
);

// Cambiar estado

router.put(
    "/:id/estado",
    authMiddleware,
    tecnicoMiddleware,
    trabajoController.cambiarEstado
);

export default router;