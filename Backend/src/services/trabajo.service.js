import trabajoRepository from "../repositories/trabajo.repository.js";
import solicitudRepository from "../repositories/solicitud.repository.js";
import mongoose from "mongoose";
class TrabajoService {

    /*
    =========================================
    Crear trabajo
    =========================================
    */

    async crearDesdeSolicitud(solicitudId) {

        // Buscar solicitud
        const solicitud =
            await solicitudRepository.obtenerPorId(solicitudId);

        if (!solicitud) {

            throw new Error(
                "La solicitud no existe."
            );

        }

        // Debe estar aceptada
        if (solicitud.estado !== "aceptado") {

            throw new Error(
                "La solicitud aún no ha sido aceptada."
            );

        }

        // Verificar que no exista un trabajo
        const existe =
            await trabajoRepository.obtenerPorSolicitud(
                solicitudId
            );

        if (existe) {

            throw new Error(
                "Esta solicitud ya tiene un trabajo."
            );

        }

        const trabajo =
            await trabajoRepository.crear({

                solicitud_id:
                    solicitud._id,

                cliente_id:
                    solicitud.cliente_id,

                tecnico_id:
                    solicitud.tecnico_id,

                servicio_id:
                    solicitud.servicio_id,

                estado:
                    "asignado",

                fecha_inicio:
                    new Date()

            });

        return trabajo;

    }

    /*
    =========================================
    Obtener todos
    =========================================
    */

    async obtenerTodos() {

        return await trabajoRepository.obtenerTodos();

    }

    /*
    =========================================
    Obtener por id
    =========================================
    */

    async obtenerPorId(id) {

        const trabajo =
            await trabajoRepository.obtenerPorId(id);

        if (!trabajo) {

            throw new Error(
                "Trabajo no encontrado."
            );

        }

        return trabajo;

    }

    /*
    =========================================
    Cambiar estado
    =========================================
    */

    async cambiarEstado(id, estado) {

    const session =
        await mongoose.startSession();

    session.startTransaction();

    try {

        const solicitud =
            await solicitudRepository.obtenerPorId(id);

        if (!solicitud) {

            throw new Error(
                "Solicitud no encontrada."
            );

        }

        const solicitudActualizada =
            await solicitudRepository
                .actualizarEstadoConSession(

                    id,

                    estado,

                    session

                );

        let trabajo = null;

        if (estado === "aceptado") {

            trabajo =
                await trabajoService.crearAutomatico(

                    solicitudActualizada,

                    session

                );

        }

        await session.commitTransaction();

        session.endSession();

        return {

            solicitud: solicitudActualizada,

            trabajo

        };

    }

    catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

}
    async crearAutomatico(solicitud, session) {

    const existe =
        await trabajoRepository.obtenerPorSolicitud(
            solicitud._id
        );

    if (existe) {

        throw new Error(
            "Ya existe un trabajo."
        );

    }

    return await trabajoRepository.crearConSession(

        {

            solicitud_id: solicitud._id,

            cliente_id: solicitud.cliente_id,

            tecnico_id: solicitud.tecnico_id,

            servicio_id: solicitud.servicio_id,

            estado: "asignado",

            fecha_inicio: new Date()

        },

        session

    );

}

}

export default new TrabajoService();