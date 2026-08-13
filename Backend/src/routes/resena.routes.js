import { Router } from "express";
import tecnicoMiddleware from "../middlewares/tecnicoMiddleware.js";
import resenaController from "../controllers/resena.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Crear reseña
router.post(
    "/",
    authMiddleware,
    resenaController.crear
);

// Obtener todas
router.get(
    "/",
    resenaController.obtenerTodas
);

// Obtener por técnico
router.get(
    "/tecnico/:tecnicoId",
    resenaController.obtenerPorTecnico
);

// Obtener por ID
router.get(
    "/:id",
    resenaController.obtenerPorId
);

export default router;