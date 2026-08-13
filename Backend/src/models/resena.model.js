import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema(
    {

        trabajo_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trabajo",
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

        calificacion: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comentario: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        }

    },
    {
        timestamps: true
    }
);

resenaSchema.index({ tecnico_id: 1 });
resenaSchema.index({ calificacion: 1 });

export default mongoose.model(
    "Resena",
    resenaSchema
);