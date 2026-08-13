import especialidadService from "../services/especialidad.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import { MENSAJES } from "../constants/mensajes.js";

class EspecialidadController {

    async crear(req, res, next) {

        try {

            const especialidad = await especialidadService.crear(req.body);

            return res.status(HTTP_STATUS.CREATED).json({

                success: true,

                message: MENSAJES.ESPECIALIDAD_CREADA,

                data: especialidad

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerTodas(req, res, next) {

        try {

            const especialidades = await especialidadService.obtenerTodas();

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                data: especialidades

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerPorId(req, res, next) {

        try {

            const especialidad = await especialidadService.obtenerPorId(req.params.id);

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                data: especialidad

            });

        } catch (error) {

            next(error);

        }

    }

    async actualizar(req, res, next) {

        try {

            const especialidad = await especialidadService.actualizar(

                req.params.id,

                req.body

            );

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                message: MENSAJES.ESPECIALIDAD_ACTUALIZADA,

                data: especialidad

            });

        } catch (error) {

            next(error);

        }

    }

    async eliminar(req, res, next) {

        try {

            await especialidadService.eliminar(req.params.id);

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                message: MENSAJES.ESPECIALIDAD_ELIMINADA

            });

        } catch (error) {

            next(error);

        }

    }

}

export default new EspecialidadController();