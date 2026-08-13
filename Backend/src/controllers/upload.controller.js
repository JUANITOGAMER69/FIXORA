import uploadService from "../services/upload.service.js";

class UploadController {

    // ==========================
    // FOTO DE PERFIL
    // ==========================

    async subirFotoPerfil(req, res, next) {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message: "Debe seleccionar una imagen."

                });

            }

            const usuario = await uploadService.subirFotoPerfil(

                req.usuario._id,

                req.file

            );

            return res.status(200).json({

                success: true,

                message: "Foto de perfil actualizada correctamente.",

                data: usuario

            });

        } catch (error) {

            next(error);

        }

    }

    // ==========================
    // DOCUMENTO DEL TÉCNICO
    // ==========================

    async subirDocumentoTecnico(req, res, next) {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message: "Debe seleccionar un archivo."

                });

            }

            const { tipo } = req.body;

            const documento = await uploadService.subirDocumentoTecnico(

                req.usuario._id,

                req.file,

                tipo

            );

            return res.status(201).json({

                success: true,

                message: "Documento cargado correctamente.",

                data: documento

            });

        } catch (error) {

            next(error);

        }

    }
        async subirImagenServicio(req, res, next) {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Debe seleccionar una imagen."

            });

        }

        const servicio = await uploadService.subirImagenServicio(

            req.usuario._id,

            req.params.servicioId,

            req.file

        );

        return res.status(201).json({

            success: true,

            message: "Imagen agregada correctamente.",

            data: servicio

        });

    } catch (error) {

        next(error);

    }

}
}

export default new UploadController();