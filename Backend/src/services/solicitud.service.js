import solicitudRepository from "../repositories/solicitud.repository.js";
import servicioRepository from "../repositories/servicio.repository.js";
import tecnicoRepository from "../repositories/tecnico.repository.js";
import usuarioRepository from "../repositories/usuario.repository.js";
import trabajoService from "./trabajo.service.js";
import { ESTADO_SOLICITUD } from "../constants/estados.js";

class SolicitudService {

    // =========================
    // CREAR SOLICITUD
    // =========================
    async crear(data) {

        // 1. Validar cliente
        const cliente = await usuarioRepository.obtenerPorId(
            data.cliente_id
        );

        if (!cliente) {
            throw new Error("Cliente no encontrado.");
        }

        // 2. Validar servicio
        const servicio = await servicioRepository.obtenerPorId(
            data.servicio_id
        );

        if (!servicio) {
            throw new Error("Servicio no encontrado.");
        }

        // 3. Validar técnico
        const tecnico = await tecnicoRepository.obtenerPorId(
            data.tecnico_id
        );

        if (!tecnico) {
            throw new Error("Técnico no encontrado.");
        }

        // 4. Verificar que el servicio pertenezca al técnico
        if (servicio.tecnico_id.toString() !== data.tecnico_id) {
            throw new Error("El servicio no pertenece a este técnico.");
        }

        // 5. Crear solicitud
        const nuevaSolicitud = await solicitudRepository.crear({
            cliente_id: data.cliente_id,
            tecnico_id: data.tecnico_id,
            servicio_id: data.servicio_id,
            descripcion_cliente: data.descripcion_cliente,
            direccion: data.direccion,
            precio_acordado: data.precio_acordado || servicio.precio,
            estado: ESTADO_SOLICITUD.PENDIENTE
        });

        return nuevaSolicitud;
    }

    // =========================
    // OBTENER TODAS
    // =========================
    async obtenerTodas() {
        return await solicitudRepository.obtenerTodas();
    }

    // =========================
    // POR ID
    // =========================
    async obtenerPorId(id) {

        const solicitud = await solicitudRepository.obtenerPorId(id);

        if (!solicitud) {
            throw new Error("Solicitud no encontrada.");
        }

        return solicitud;
    }

    // =========================
    // POR CLIENTE
    // =========================
    async obtenerPorCliente(clienteId) {
        return await solicitudRepository.obtenerPorCliente(clienteId);
    }

    // =========================
    // POR TÉCNICO
    // =========================
    async obtenerPorTecnico(tecnicoId) {
        return await solicitudRepository.obtenerPorTecnico(tecnicoId);
    }

    // =========================
    // CAMBIAR ESTADO
    // =========================
    async cambiarEstado(id, estado) {

    const solicitud =
        await solicitudRepository.obtenerPorId(id);

    if (!solicitud) {

        throw new Error(
            "Solicitud no encontrada."
        );

    }

    const estadosValidos = [

        "pendiente",

        "aceptado",

        "rechazado",

        "en_proceso",

        "finalizado"

    ];

    if (!estadosValidos.includes(estado)) {

        throw new Error(
            "Estado inválido."
        );

    }

    const solicitudActualizada =
        await solicitudRepository.actualizarEstado(
            id,
            estado
        );

    let trabajo = null;

    if (estado === "aceptado") {

        trabajo =
            await trabajoService.crearAutomatico(
                solicitudActualizada
            );

    }

    return {

        solicitud: solicitudActualizada,

        trabajo

    };

}

    // =========================
    // ELIMINAR
    // =========================
    async eliminar(id) {

        const solicitud = await solicitudRepository.obtenerPorId(id);

        if (!solicitud) {
            throw new Error("Solicitud no encontrada.");
        }

        return await solicitudRepository.eliminar(id);
    }
}

export default new SolicitudService();