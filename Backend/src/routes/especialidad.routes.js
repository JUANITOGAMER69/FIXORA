import { Router } from "express";

import especialidadController from "../controllers/especialidad.controller.js";

import {

    validarEspecialidad

} from "../validations/especialidad.validation.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get(

    "/",

    especialidadController.obtenerTodas

);

router.get(

    "/:id",

    especialidadController.obtenerPorId

);

router.post(

    "/",


    validarEspecialidad,

    especialidadController.crear

);

router.put(

    "/:id",


    validarEspecialidad,

    especialidadController.actualizar

);

router.delete(

    "/:id",


    especialidadController.eliminar

);

export default router;