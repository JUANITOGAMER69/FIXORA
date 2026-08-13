import servicioService from "../services/servicio.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

class ServicioController {

    // =========================
    // CREAR SERVICIO
    // =========================
    async crear(req, res, next) {

        try {

            const servicio = await servicioService.crear(req.body);

            return res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: "Servicio creado correctamente",
                data: servicio
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // OBTENER TODOS
    // =========================
    async obtenerTodos(req, res, next) {

        try {

            const servicios = await servicioService.obtenerTodos();

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                data: servicios
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

            const servicio = await servicioService.obtenerPorId(req.params.id);

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                data: servicio
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // POR TECNICO
    // =========================
    async obtenerPorTecnico(req, res, next) {

        try {

            const servicios = await servicioService.obtenerPorTecnico(req.params.tecnicoId);

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                data: servicios
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // POR CATEGORIA
    // =========================
    async obtenerPorCategoria(req, res, next) {

        try {

            const servicios = await servicioService.obtenerPorCategoria(req.params.categoriaId);

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                data: servicios
            });

        } catch (error) {
            next(error);
        }
    }

    // =========================
    // ACTUALIZAR
    // =========================
    async actualizar(req, res, next) {

        try {

            const servicio = await servicioService.actualizar(
                req.params.id,
                req.body
            );

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Servicio actualizado correctamente",
                data: servicio
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

            await servicioService.eliminar(req.params.id);

            return res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Servicio eliminado correctamente"
            });

        } catch (error) {
            next(error);
        }
    }
}

export default new ServicioController();