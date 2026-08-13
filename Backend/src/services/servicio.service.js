import servicioRepository from "../repositories/servicio.repository.js";
import tecnicoRepository from "../repositories/tecnico.repository.js";
import especialidadRepository from "../repositories/especialidad.repository.js";

import { MENSAJES } from "../constants/mensajes.js";
import { ESTADO_APROBACION } from "../constants/estados.js";

class ServicioService {

    // =========================
    // CREAR SERVICIO
    // =========================
    async crear(data) {

        // 1. Verificar técnico
        const tecnico = await tecnicoRepository.obtenerPorId(
            data.tecnico_id
        );

        if (!tecnico) {
            throw new Error(MENSAJES.TECNICO_NO_ENCONTRADO);
        }

        // 2. Verificar que esté aprobado
        if (tecnico.estado_aprobacion !== ESTADO_APROBACION.APROBADO) {
            throw new Error("El técnico aún no está aprobado.");
        }

        // 3. Verificar categoría/especialidad
        const especialidad = await especialidadRepository.obtenerPorId(
            data.categoria
        );

        if (!especialidad) {
            throw new Error(MENSAJES.ESPECIALIDAD_NO_ENCONTRADA);
        }

        // 4. Validación opcional: precio
        if (data.precio <= 0) {
            throw new Error("El precio debe ser mayor a 0.");
        }

        // 5. Crear servicio
        return await servicioRepository.crear(data);
    }

    // =========================
    // OBTENER TODOS
    // =========================
    async obtenerTodos() {
        return await servicioRepository.obtenerTodos();
    }

    // =========================
    // OBTENER POR ID
    // =========================
    async obtenerPorId(id) {

        const servicio = await servicioRepository.obtenerPorId(id);

        if (!servicio) {
            throw new Error("Servicio no encontrado.");
        }

        return servicio;
    }

    // =========================
    // POR TECNICO
    // =========================
    async obtenerPorTecnico(tecnicoId) {
        return await servicioRepository.obtenerPorTecnico(tecnicoId);
    }

    // =========================
    // POR CATEGORIA
    // =========================
    async obtenerPorCategoria(categoriaId) {
        return await servicioRepository.obtenerPorCategoria(categoriaId);
    }

    // =========================
    // ACTUALIZAR
    // =========================
    async actualizar(id, data) {

        const servicio = await servicioRepository.obtenerPorId(id);

        if (!servicio) {
            throw new Error("Servicio no encontrado.");
        }

        // Validar precio si viene
        if (data.precio && data.precio <= 0) {
            throw new Error("El precio debe ser mayor a 0.");
        }

        return await servicioRepository.actualizar(id, data);
    }

    // =========================
    // ELIMINAR
    // =========================
    async eliminar(id) {

        const servicio = await servicioRepository.obtenerPorId(id);

        if (!servicio) {
            throw new Error("Servicio no encontrado.");
        }

        return await servicioRepository.eliminar(id);
    }
}

export default new ServicioService();