import { Router } from "express";

import upload from "../middlewares/multer.middleware.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import uploadController from "../controllers/upload.controller.js";

import tecnicoMiddleware from "../middlewares/tecnicoMiddleware.js";
const router = Router();

router.post(

    "/perfil",

    authMiddleware,

    upload.single("imagen"),

    uploadController.subirFotoPerfil

);

router.post(

    "/servicios/:servicioId",

    authMiddleware,

    tecnicoMiddleware,

    upload.single("imagen"),

    uploadController.subirImagenServicio

);

export default router;