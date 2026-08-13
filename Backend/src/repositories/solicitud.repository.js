import Solicitud from "../models/solicitud.model.js";

class SolicitudRepository {

    async crear(data) {
        return await Solicitud.create(data);
    }

    async obtenerTodas() {
        return await Solicitud.find()
            .populate("cliente_id")
            .populate("tecnico_id")
            .populate("servicio_id")
            .sort({ createdAt: -1 });
    }

    async obtenerPorId(id) {
        return await Solicitud.findById(id)
            .populate("cliente_id")
            .populate("tecnico_id")
            .populate("servicio_id");
    }

    async obtenerPorCliente(clienteId) {
        return await Solicitud.find({ cliente_id: clienteId })
            .populate("servicio_id")
            .populate("tecnico_id");
    }

    async obtenerPorTecnico(tecnicoId) {
        return await Solicitud.find({ tecnico_id: tecnicoId })
            .populate("servicio_id")
            .populate("cliente_id");
    }

    async actualizarEstado(id, estado) {
        return await Solicitud.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );
    }

    async eliminar(id) {
        return await Solicitud.findByIdAndDelete(id);
    }
    async actualizarEstadoConSession(id, estado, session) {

    return await Solicitud.findByIdAndUpdate(

        id,

        { estado },

        {

            new: true,

            session

        }

    );

}
}

export default new SolicitudRepository();