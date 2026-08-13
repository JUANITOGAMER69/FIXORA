import tecnicoService from "../services/tecnico.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import { MENSAJES } from "../constants/mensajes.js";

class TecnicoController {

    async crear(req, res, next) {

        try {

            const tecnico = await tecnicoService.crear(req.body);

            return res.status(HTTP_STATUS.CREATED).json({

                success: true,

                message: MENSAJES.PERFIL_TECNICO_CREADO,

                data: tecnico

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerTodos(req, res, next) {

        try {

            const tecnicos = await tecnicoService.obtenerTodos();

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                data: tecnicos

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerPorId(req, res, next) {

        try {

            const tecnico = await tecnicoService.obtenerPorId(req.params.id);

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                data: tecnico

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerPorUsuario(req, res, next) {

        try {

            const tecnico = await tecnicoService.obtenerPorUsuario(req.params.usuarioId);

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                data: tecnico

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerPorEstado(req, res, next) {

        try {

            const tecnicos = await tecnicoService.obtenerPorEstado(req.params.estado);

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                data: tecnicos

            });

        } catch (error) {

            next(error);

        }

    }

    async actualizar(req, res, next) {

        try {

            const tecnico = await tecnicoService.actualizar(req.params.id, req.body);

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                message: MENSAJES.PERFIL_TECNICO_ACTUALIZADO,

                data: tecnico

            });

        } catch (error) {

            next(error);

        }

    }

    async eliminar(req, res, next) {

        try {

            await tecnicoService.eliminar(req.params.id);

            return res.status(HTTP_STATUS.OK).json({

                success: true,

                message: MENSAJES.PERFIL_TECNICO_ELIMINADO

            });

        } catch (error) {

            next(error);

        }

    }
        async actualizarUbicacion(req, res, next) {

    try {

        const tecnico =

            await tecnicoService.actualizarUbicacion(

                req.usuario._id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Ubicación actualizada correctamente.",

            data: tecnico

        });

    } catch (error) {

        next(error);

    }

}
        async buscarTecnicosCercanos(req, res, next) {

    try {

        const {

            lat,

            lng,

            distancia

        } = req.query;

        const tecnicos =

            await tecnicoService.buscarTecnicosCercanos(

                lat,

                lng,

                distancia

            );

        return res.status(200).json({

            success: true,

            message: "Técnicos encontrados.",

            total: tecnicos.length,

            data: tecnicos

        });

    } catch (error) {

        next(error);

    }

}
async buscar(req, res, next) {

    try {

        const tecnicos = await tecnicoService.buscarTecnicos(

            req.query

        );

        return res.status(200).json({

            success: true,

            message: "Técnicos encontrados.",

            total: tecnicos.length,

            data: tecnicos

        });

    } catch (error) {

        next(error);

    }

}
}

export default new TecnicoController();