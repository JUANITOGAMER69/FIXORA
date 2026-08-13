import tecnicoRepository from "../repositories/tecnico.repository.js";

import usuarioRepository from "../repositories/usuario.repository.js";

import especialidadRepository from "../repositories/especialidad.repository.js";

import { MENSAJES } from "../constants/mensajes.js";

import tecnicoDTO from "../dto/tecnico.dto.js";

class TecnicoService {    
    async crear(datos) {

        const usuario = await usuarioRepository.obtenerPorId(
            datos.usuario_id
        );

        if (!usuario) {

            throw new Error(
                MENSAJES.USUARIO_NO_ENCONTRADO
            );

        }

        const existe = await tecnicoRepository.existeUsuario(
            datos.usuario_id
        );

        if (existe) {

            throw new Error(
                MENSAJES.TECNICO_EXISTE
            );

        }

        if (
            !datos.especialidades ||
            datos.especialidades.length === 0
        ) {

            throw new Error(
                MENSAJES.ESPECIALIDAD_REQUERIDA
            );

        }

        for (const especialidadId of datos.especialidades) {

            const especialidad =
                await especialidadRepository.obtenerPorId(
                    especialidadId
                );

            if (!especialidad) {

                throw new Error(
                    MENSAJES.ESPECIALIDAD_NO_ENCONTRADA
                );

            }

        }

        return await tecnicoRepository.crear(
            datos
        );
}
            async obtenerTodos() {

        return await tecnicoRepository.obtenerTodos();

    }

        async obtenerPorId(id) {

        const tecnico =
            await tecnicoRepository.obtenerPorId(id);

        if (!tecnico) {

            throw new Error(
                MENSAJES.TECNICO_NO_ENCONTRADO
            );

        }

        return tecnico;

    }
        async obtenerPorUsuario(usuarioId) {

        const tecnico =
            await tecnicoRepository.obtenerPorUsuario(
                usuarioId
            );

        if (!tecnico) {

            throw new Error(
                MENSAJES.TECNICO_NO_ENCONTRADO
            );

        }

        return tecnico;

    }
        async obtenerPorEstado(estado) {

        return await tecnicoRepository.obtenerPorEstado(
            estado
        );

    }
        async actualizar(id, datos) {

        const tecnico =
            await tecnicoRepository.obtenerPorId(id);

        if (!tecnico) {

            throw new Error(
                MENSAJES.TECNICO_NO_ENCONTRADO
            );

        }

        if (datos.especialidades) {

            for (const especialidadId of datos.especialidades) {

                const especialidad =
                    await especialidadRepository.obtenerPorId(
                        especialidadId
                    );

                if (!especialidad) {

                    throw new Error(
                        MENSAJES.ESPECIALIDAD_NO_ENCONTRADA
                    );

                }

            }

        }

        return await tecnicoRepository.actualizar(
            id,
            datos
        );

    }
        async eliminar(id) {

        const tecnico =
            await tecnicoRepository.obtenerPorId(id);

        if (!tecnico) {

            throw new Error(
                MENSAJES.TECNICO_NO_ENCONTRADO
            );

        }

        return await tecnicoRepository.eliminar(
            id
        );

    }
        async actualizarUbicacion(usuarioId, data) {

    const tecnico = await tecnicoRepository.obtenerPorUsuario(usuarioId);

    if (!tecnico) {

        throw new Error("Perfil técnico no encontrado.");

    }

    return await tecnicoRepository.actualizarUbicacion(

        tecnico._id,

        data

    );

}
        async buscarTecnicosCercanos(latitud, longitud, distancia = 10000) {

    if (!latitud || !longitud) {

        throw new Error(
            "Debe proporcionar la latitud y longitud."
        );

    }

    return await tecnicoRepository.buscarTecnicosCercanos(

        latitud,

        longitud,

        distancia

    );

}
async buscarTecnicos(filtros) {

    const tecnicos = await tecnicoRepository.buscarTecnicosGeo(

        filtros

    );

    return tecnicos.map(

        tecnico => tecnicoDTO(tecnico)

    );

}
};

export default new TecnicoService();