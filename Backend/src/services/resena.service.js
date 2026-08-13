import resenaRepository from "../repositories/resena.repository.js";
import trabajoRepository from "../repositories/trabajo.repository.js";
import tecnicoRepository from "../repositories/tecnico.repository.js";

class ResenaService {

    /*
    =========================================
    Crear reseña
    =========================================
    */

   async crear(data, usuarioAutenticado) {

    // Buscar trabajo

    const trabajo =
        await trabajoRepository.obtenerPorId(
            data.trabajo_id
        );

    if (!trabajo) {

        throw new Error(
            "Trabajo no encontrado."
        );

    }

    // Debe estar finalizado

    if (trabajo.estado !== "finalizado") {

        throw new Error(
            "Solo se pueden calificar trabajos finalizados."
        );

    }

    // Verificar que el cliente sea el dueño del trabajo

    if (
        trabajo.cliente_id._id.toString() !==
        usuarioAutenticado._id.toString()
    ) {

        throw new Error(
            "No puedes calificar un trabajo que no te pertenece."
        );

    }

    // Solo una reseña

    const existe =
        await resenaRepository.obtenerPorTrabajo(
            data.trabajo_id
        );

    if (existe) {

        throw new Error(
            "Este trabajo ya fue calificado."
        );

    }

    // Crear reseña

    const resena =
        await resenaRepository.crear({

            trabajo_id:
                trabajo._id,

            cliente_id:
                usuarioAutenticado._id,

            tecnico_id:
                trabajo.tecnico_id._id,

            calificacion:
                data.calificacion,

            comentario:
                data.comentario

        });

    // Actualizar promedio

    await this.actualizarPromedioTecnico(
        trabajo.tecnico_id._id
    );

    return resena;

}

    /*
    =========================================
    Obtener todas
    =========================================
    */

    async obtenerTodas() {

        return await resenaRepository.obtenerTodas();

    }

    /*
    =========================================
    Obtener por ID
    =========================================
    */

    async obtenerPorId(id) {

        const resena =
            await resenaRepository.obtenerPorId(id);

        if (!resena) {

            throw new Error(
                "Reseña no encontrada."
            );

        }

        return resena;

    }

    /*
    =========================================
    Obtener por técnico
    =========================================
    */

    async obtenerPorTecnico(id) {

        return await resenaRepository.obtenerPorTecnico(id);

    }

    /*
    =========================================
    Actualizar promedio
    =========================================
    */

    async actualizarPromedioTecnico(tecnicoId) {

        const resenas =
            await resenaRepository.obtenerPorTecnico(
                tecnicoId
            );

        if (!resenas.length) {

            return;

        }

        const total =
            resenas.reduce(

                (suma, r) =>

                    suma + r.calificacion,

                0

            );

        const promedio =
            Number(

                (

                    total /

                    resenas.length

                ).toFixed(2)

            );

        await tecnicoRepository.actualizar(

            tecnicoId,

            {

                calificacion_promedio:
                    promedio,

                total_resenas:
                    resenas.length

            }

        );

    }

}
export default new ResenaService();