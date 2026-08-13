import mongoose from "mongoose";

import { ESTADO_APROBACION } from "../constants/estados.js";

const documentoSchema = new mongoose.Schema(
    {
        tipo: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },

        archivo_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        fecha_subida: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: false
    }
);

const horarioSchema = new mongoose.Schema(
    {
        dia: {
            type: Number,
            min: 0,
            max: 6,
            required: true
        },

        inicio: {
            type: String,
            required: true,
            trim: true
        },

        fin: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

const tecnicoSchema = new mongoose.Schema(
    {
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },

        especialidades: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Especialidad"
            }
        ],

        descripcion: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        },

        experiencia: {
            type: Number,
            default: 0,
            min: 0,
            max: 60
        },

        radio_servicio: {
            type: Number,
            default: 10,
            min: 1,
            max: 100
        },

       ubicacion: {

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

direccion: {

    type: String,

    trim: true

},

ciudad: {

    type: String,

    trim: true

},

estado: {

    type: String,

    trim: true

},

codigo_postal: {

    type: String,

    trim: true

},

        trabajos_realizados: {
            type: Number,
            default: 0,
            min: 0
        }

    },

    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        },

        versionKey: false
    }

);
    documentos: [

    {

        nombre: {

            type: String,

            required: true

        },

        url: {

            type: String,

            required: true

        },

        public_id: {

            type: String,

            required: true

        },

        tipo: {

            type: String,

            enum: [

                "ine",

                "domicilio",

                "certificacion",

                "titulo",

                "otro"

            ],

            default: "otro"

        },

        fecha_subida: {

            type: Date,

            default: Date.now

        }

    }

],

tecnicoSchema.index(
    {
        usuario_id: 1
    },
    {
        unique: true
    }
);

tecnicoSchema.index({
    estado_aprobacion: 1
});

tecnicoSchema.index({
    promedio_calificacion: -1
});

tecnicoSchema.index({
    ubicacion: "2dsphere"
});

export default mongoose.model(
    "Tecnico",
    tecnicoSchema
);