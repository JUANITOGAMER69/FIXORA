import trabajoService from "../services/trabajo.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

class TrabajoController {

    async crear(req, res, next) {

        try {

            const trabajo =
                await trabajoService.crearDesdeSolicitud(
                    req.body.solicitud_id
                );

            return res.status(
                HTTP_STATUS.CREATED
            ).json({

                success: true,

                message:
                    "Trabajo creado correctamente.",

                data: trabajo

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerTodos(req, res, next) {

        try {

            const trabajos =
                await trabajoService.obtenerTodos();

            return res.status(
                HTTP_STATUS.OK
            ).json({

                success: true,

                data: trabajos

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerPorId(req, res, next) {

        try {

            const trabajo =
                await trabajoService.obtenerPorId(
                    req.params.id
                );

            return res.status(
                HTTP_STATUS.OK
            ).json({

                success: true,

                data: trabajo

            });

        } catch (error) {

            next(error);

        }

    }

    async cambiarEstado(req, res, next) {

        try {

            const trabajo =
                await trabajoService.cambiarEstado(

                    req.params.id,

                    req.body.estado

                );

            return res.status(
                HTTP_STATUS.OK
            ).json({

                success: true,

                message:
                    "Estado actualizado.",

                data: trabajo

            });

        } catch (error) {

            next(error);

        }

    }

}

export default new TrabajoController();