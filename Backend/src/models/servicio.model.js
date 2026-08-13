import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema(
    {

        tecnico_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tecnico",
            required: true
        },

        titulo: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120
        },

        descripcion: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },

        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Especialidad",
            required: true
        },

        precio: {
            type: Number,
            required: true,
            min: 0
        },

        duracion_estimada: {
            type: Number,
            default: 60
        },

        ubicacion_servicio: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },

        disponible: {
            type: Boolean,
            default: true
        },

        imagenes: [

    {

        url: {

            type: String,

            required: true

        },

        public_id: {

            type: String,

            required: true

        },

        fecha_subida: {

            type: Date,

            default: Date.now

        }

    }

],

        calificacion_promedio: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        total_reviews: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true
    }
    
);

servicioSchema.index({ tecnico_id: 1 });
servicioSchema.index({ categoria: 1 });
servicioSchema.index({ precio: 1 });
servicioSchema.index({ ubicacion_servicio: "2dsphere" });

export default mongoose.model("Servicio", servicioSchema);