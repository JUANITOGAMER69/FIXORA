import { Router } from "express";

import tecnicoController from "../controllers/tecnico.controller.js";

import {validarTecnico} from "../validations/tecnico.validation.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import tecnicoMiddleware from "../middlewares/tecnicoMiddleware.js";

import {actualizarUbicacionValidation} from "../validations/tecnico.validation.js";

import validarCampos from "../middlewares/validarCampos.js";
const router = Router();

router.get(

    "/",

    tecnicoController.obtenerTodos

);

router.get(

    "/:id",

    tecnicoController.obtenerPorId

);

router.get(

    "/usuario/:usuarioId",

    tecnicoController.obtenerPorUsuario

);

router.get(

    "/estado/:estado",

    tecnicoController.obtenerPorEstado

);

router.post(

    "/",

    validarTecnico,

    tecnicoController.crear

);

router.put(

    "/:id",

    validarTecnico,

    tecnicoController.actualizar

);

router.delete(

    "/:id",

    tecnicoController.eliminar

);
router.put(

    "/ubicacion",

    authMiddleware,

    tecnicoMiddleware,

    actualizarUbicacionValidation,

    validarCampos,

    tecnicoController.actualizarUbicacion

);
router.get(

    "/cercanos",

    tecnicoController.buscarTecnicosCercanos

);
router.get(

    "/buscar",

    tecnicoController.buscar

);
export default router;