import solicitudService from "../services/solicitud.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

class SolicitudController {

    // =========================
    // CREAR SOLICITUD
    // =========================
    async crear(req, res, next) {

        try {

            const solicitud = await solicitudService.crear(req.body);

            return res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: "Solicitud creada correctamente",
                data: solicitud
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // OBTENER TODAS
    // =========================
    async obtenerTodas(req, res, next) {

        try {

            const solicitudes = await solicitudService.obtenerTodas();

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                data: solicitudes
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // OBTENER POR ID
    // =========================
    async obtenerPorId(req, res, next) {

        try {

            const solicitud = await solicitudService.obtenerPorId(req.params.id);

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                data: solicitud
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // POR CLIENTE
    // =========================
    async obtenerPorCliente(req, res, next) {

        try {

            const solicitudes = await solicitudService.obtenerPorCliente(req.params.clienteId);

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                data: solicitudes
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // POR TÉCNICO
    // =========================
    async obtenerPorTecnico(req, res, next) {

        try {

            const solicitudes = await solicitudService.obtenerPorTecnico(req.params.tecnicoId);

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                data: solicitudes
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // CAMBIAR ESTADO
    // =========================
    async cambiarEstado(req, res, next) {

    try {

        const resultado =
            await solicitudService.cambiarEstado(

                req.params.id,

                req.body.estado

            );

        return res.status(
            HTTP_STATUS.OK
        ).json({

            success: true,

            message:
                "Solicitud actualizada correctamente.",

            data: resultado

        });

    } catch (error) {

        next(error);

    }

}

    // =========================
    // ELIMINAR
    // =========================
    async eliminar(req, res, next) {

        try {

            await solicitudService.eliminar(req.params.id);

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Solicitud eliminada correctamente"
            });

        } catch (error) {
            next(error);
        }
    }
    async aceptar(req, res, next) {

    try {

        const resultado =
            await solicitudService.cambiarEstado(

                req.params.id,

                "aceptado"

            );

        return res.status(
            HTTP_STATUS.OK
        ).json({

            success: true,

            message:
                "Solicitud aceptada correctamente.",

            data: resultado

        });

    } catch (error) {

        next(error);

    }

}
}

export default new SolicitudController();