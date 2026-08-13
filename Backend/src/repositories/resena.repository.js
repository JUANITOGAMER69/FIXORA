import Resena from "../models/resena.model.js";

class ResenaRepository {

    /*
    =========================================
    Crear
    =========================================
    */

    async crear(data) {

        return await Resena.create(data);

    }

    /*
    =========================================
    Obtener todas
    =========================================
    */

    async obtenerTodas() {

        return await Resena.find()

            .populate("cliente_id")

            .populate("tecnico_id")

            .populate("trabajo_id")

            .sort({

                createdAt: -1

            });

    }

    /*
    =========================================
    Obtener por ID
    =========================================
    */

    async obtenerPorId(id) {

        return await Resena.findById(id)

            .populate("cliente_id")

            .populate("tecnico_id")

            .populate("trabajo_id");

    }

    /*
    =========================================
    Obtener por trabajo
    =========================================
    */

    async obtenerPorTrabajo(trabajoId) {

        return await Resena.findOne({

            trabajo_id: trabajoId

        });

    }

    /*
    =========================================
    Obtener por técnico
    =========================================
    */

    async obtenerPorTecnico(tecnicoId) {

        return await Resena.find({

            tecnico_id: tecnicoId

        })

        .populate("cliente_id")

        .sort({

            createdAt: -1

        });

    }

    /*
    =========================================
    Actualizar
    =========================================
    */

    async actualizar(id, data) {

        return await Resena.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        );

    }

    /*
    =========================================
    Eliminar
    =========================================
    */

    async eliminar(id) {

        return await Resena.findByIdAndDelete(id);

    }

}

export default new ResenaRepository();