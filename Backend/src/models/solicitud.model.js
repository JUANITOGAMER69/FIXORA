import mongoose from "mongoose";

const solicitudSchema = new mongoose.Schema(
    {

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
            enum: ["pendiente", "aceptado", "rechazado", "en_proceso", "finalizado"],
            default: "pendiente"
        },

        descripcion_cliente: {
            type: String,
            trim: true,
            maxlength: 500
        },

        direccion: {
            type: String,
            required: true,
            trim: true
        },

        fecha_solicitud: {
            type: Date,
            default: Date.now
        },

        precio_acordado: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true
    }
);

solicitudSchema.index({ cliente_id: 1 });
solicitudSchema.index({ tecnico_id: 1 });
solicitudSchema.index({ estado: 1 });

export default mongoose.model("Solicitud", solicitudSchema);