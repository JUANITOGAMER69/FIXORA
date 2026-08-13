import Servicio from "../models/servicio.model.js";

class ServicioRepository {

    async crear(data) {
        return await Servicio.create(data);
    }

    async obtenerTodos() {
        return await Servicio.find()
            .populate("tecnico_id")
            .populate("categoria")
            .sort({ createdAt: -1 });
    }

    async obtenerPorId(id) {
        return await Servicio.findById(id)
            .populate("tecnico_id")
            .populate("categoria");
    }

    async obtenerPorTecnico(tecnicoId) {
        return await Servicio.find({ tecnico_id: tecnicoId })
            .populate("categoria");
    }

    async obtenerPorCategoria(categoriaId) {
        return await Servicio.find({ categoria: categoriaId })
            .populate("tecnico_id");
    }

    async actualizar(id, data) {
        return await Servicio.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
    }

    async eliminar(id) {
        return await Servicio.findByIdAndDelete(id);
    }
    async agregarImagen(idServicio, imagen) {

    return await Servicio.findByIdAndUpdate(

        idServicio,

        {

            $push: {

                imagenes: imagen

            }

        },

        {

            new: true,

            runValidators: true

        }

    );

}
        async eliminarImagen(idServicio, idImagen) {

    return await Servicio.findByIdAndUpdate(

        idServicio,

        {

            $pull: {

                imagenes: {

                    _id: idImagen

                }

            }

        },

        {

            new: true

        }

    );

}   
        async obtenerImagenes(idServicio) {

    const servicio = await Servicio.findById(idServicio)

        .select("imagenes");

    return servicio?.imagenes || [];

}
}

export default new ServicioRepository();