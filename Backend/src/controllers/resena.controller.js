import resenaService from "../services/resena.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

class ResenaController {

    async crear(req, res, next) {

        try {

            const resena =
                await resenaService.crear(

                    req.body,

                    req.usuario

                );

            return res.status(
                HTTP_STATUS.CREATED
            ).json({

                success: true,

                message:
                    "Reseña creada correctamente.",

                data: resena

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerTodas(req, res, next) {

        try {

            const resenas =
                await resenaService.obtenerTodas();

            return res.status(
                HTTP_STATUS.OK
            ).json({

                success: true,

                data: resenas

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerPorId(req, res, next) {

        try {

            const resena =
                await resenaService.obtenerPorId(
                    req.params.id
                );

            return res.status(
                HTTP_STATUS.OK
            ).json({

                success: true,

                data: resena

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerPorTecnico(req, res, next) {

        try {

            const resenas =
                await resenaService.obtenerPorTecnico(
                    req.params.tecnicoId
                );

            return res.status(
                HTTP_STATUS.OK
            ).json({

                success: true,

                data: resenas

            });

        } catch (error) {

            next(error);

        }

    }

}

export default new ResenaController();