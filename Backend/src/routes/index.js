import { Router } from "express";
import especialidadRoutes from "./especialidad.routes.js";
import usuarioRoutes from "./usuario.routes.js";
import tecnicoRoutes from "./tecnico.routes.js";
import servicioRoutes from "./servicio.routes.js";
import solicitudRoutes from "./solicitud.routes.js";
import trabajoRoutes from "./trabajo.routes.js";
import resenaRoutes from "./resena.routes.js";
import uploadRoutes from "./upload.routes.js";
const router = Router();

router.get("/", (req, res) => {

    res.json({

        success: true,

        proyecto: "FIXORA",

        version: "1.0.0"

    });
    
});
router.use(

    "/upload",

    uploadRoutes

);
router.use("/especialidades",especialidadRoutes);
router.use("/tecnicos",tecnicoRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/servicios", servicioRoutes);
router.use("/solicitudes", solicitudRoutes);
router.use("/trabajos",trabajoRoutes);
router.use("/resenas",resenaRoutes);
export default router;