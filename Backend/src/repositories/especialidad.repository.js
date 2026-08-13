import Especialidad from "../models/especialidad.model.js";

class EspecialidadRepository {

    async crear(datos) {

        return await Especialidad.create(datos);

    }

    async obtenerTodas() {

        return await Especialidad.find({

            activo: true

        }).sort({

            nombre: 1

        });

    }

    async obtenerPorId(id) {

        return await Especialidad.findById(id);

    }

    async buscarPorNombre(nombre) {

        return await Especialidad.findOne({

            nombre

        });

    }

    async actualizar(id, datos) {

        return await Especialidad.findByIdAndUpdate(

            id,

            datos,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async eliminar(id) {

        return await Especialidad.findByIdAndDelete(

            id

        );

    }

}

export default new EspecialidadRepository();