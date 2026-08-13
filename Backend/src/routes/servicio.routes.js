import { Router } from "express";

import servicioController from "../controllers/servicio.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import tecnicoMiddleware from "../middlewares/tecnicoMiddleware.js";
const router = Router();

// Crear servicio
router.post(
    "/",
    authMiddleware,
    tecnicoMiddleware,
    servicioController.crear
);

// Obtener todos
router.get("/", servicioController.obtenerTodos);

// Obtener por ID
router.get("/:id", servicioController.obtenerPorId);

// Por técnico
router.get("/tecnico/:tecnicoId", servicioController.obtenerPorTecnico);

// Por categoría
router.get("/categoria/:categoriaId", servicioController.obtenerPorCategoria);

// Actualizar
router.put(
    "/:id",
    authMiddleware,
    tecnicoMiddleware,
    servicioController.actualizar
);

// Eliminar
router.delete(
    "/:id",
    authMiddleware,
    tecnicoMiddleware,
    servicioController.eliminar
);

export default router;