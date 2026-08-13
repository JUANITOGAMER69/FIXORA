import mongoose from "mongoose";

const especialidadSchema = new mongoose.Schema(

    {

        nombre: {

            type: String,

            required: true,

            trim: true,

            maxlength: 80

        },

        descripcion: {

            type: String,

            trim: true,

            maxlength: 250,

            default: ""

        },

        icono_id: {

            type: mongoose.Schema.Types.ObjectId,

            default: null

        },

        activo: {

            type: Boolean,

            default: true

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

especialidadSchema.index(

    {

        nombre: 1

    },

    {

        unique: true

    }

);

especialidadSchema.index({

    activo: 1

});

export default mongoose.model(

    "Especialidad",

    especialidadSchema

);