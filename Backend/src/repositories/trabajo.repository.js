import Trabajo from "../models/trabajo.model.js";

class TrabajoRepository {

    async crear(data) {
        return await Trabajo.create(data);
    }

    async obtenerTodos() {

        return await Trabajo.find()
            .populate("cliente_id")
            .populate("tecnico_id")
            .populate("servicio_id")
            .populate("solicitud_id")
            .sort({ createdAt: -1 });

    }

    async obtenerPorId(id) {

        return await Trabajo.findById(id)
            .populate("cliente_id")
            .populate("tecnico_id")
            .populate("servicio_id")
            .populate("solicitud_id");

    }

    async obtenerPorSolicitud(solicitudId) {

        return await Trabajo.findOne({
            solicitud_id: solicitudId
        });

    }

    async obtenerPorTecnico(tecnicoId) {

        return await Trabajo.find({
            tecnico_id: tecnicoId
        });

    }

    async obtenerPorCliente(clienteId) {

        return await Trabajo.find({
            cliente_id: clienteId
        });

    }

    async actualizar(id, data) {

        return await Trabajo.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );

    }
        async crearConSession(data, session) {

    const [trabajo] = await Trabajo.create(

        [data],

        {

            session

        }

    );

    return trabajo;

}
}

export default new TrabajoRepository();