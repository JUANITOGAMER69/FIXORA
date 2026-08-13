import especialidadRepository from "../repositories/especialidad.repository.js";

class EspecialidadService {

    async crear(datos) {

        datos.nombre = datos.nombre.trim();

        const existe = await especialidadRepository.buscarPorNombre(

            datos.nombre

        );

        if (existe) {

            throw new Error(

                "La especialidad ya existe."

            );

        }

        return await especialidadRepository.crear(

            datos

        );

    }

    async obtenerTodas() {

        return await especialidadRepository.obtenerTodas();

    }

    async obtenerPorId(id) {

        return await especialidadRepository.obtenerPorId(

            id

        );

    }

    async actualizar(id, datos) {

        if (datos.nombre) {

            datos.nombre = datos.nombre.trim();

            const existe =

                await especialidadRepository.buscarPorNombre(

                    datos.nombre

                );

            if (

                existe &&

                existe._id.toString() !== id

            ) {

                throw new Error(

                    "Ya existe otra especialidad con ese nombre."

                );

            }

        }

        return await especialidadRepository.actualizar(

            id,

            datos

        );

    }

    async eliminar(id) {

        return await especialidadRepository.eliminar(

            id

        );

    }

}

export default new EspecialidadService();