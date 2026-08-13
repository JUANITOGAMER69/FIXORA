import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import usuarioController from "../controllers/usuario.controller.js";

import {

    validarRegistro,

    validarLogin

} from "../validations/usuario.validation.js";

const router = Router();
router.get(
    "/",
    usuarioController.obtenerTodos
);
router.post(

    "/registro",

    validarRegistro,

    usuarioController.registrar

);

router.post(

    "/login",

    validarLogin,

    usuarioController.login

);
router.get(

    "/perfil",

    authMiddleware,

    usuarioController.obtenerPerfil

);

export default router;