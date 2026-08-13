import mongoose from "mongoose";

const trabajoSchema = new mongoose.Schema(
    {

        solicitud_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Solicitud",
            required: true,
            unique: true
        },

        cliente_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },

        tecnico_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tecnico",
            required: true
        },

        servicio_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Servicio",
            required: true
        },

        estado: {
            type: String,
            enum: [
                "asignado",
                "en_camino",
                "en_proceso",
                "pausado",
                "finalizado",
                "cancelado"
            ],
            default: "asignado"
        },

        fecha_inicio: Date,

        fecha_fin: Date,

        observaciones: {
            type: String,
            trim: true,
            default: ""
        }

    },
    {
        timestamps: true
    }
);

trabajoSchema.index({ tecnico_id: 1 });
trabajoSchema.index({ cliente_id: 1 });
trabajoSchema.index({ estado: 1 });

export default mongoose.model("Trabajo", trabajoSchema);