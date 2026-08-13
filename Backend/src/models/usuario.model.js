import mongoose from "mongoose";

import { ROLES } from "../constants/roles.js";

const usuarioSchema = new mongoose.Schema(

    {

        nombres: {

            type: String,

            required: true,

            trim: true,

            maxlength: 100

        },

        apellidos: {

            type: String,

            required: true,

            trim: true,

            maxlength: 150

        },

        correo: {

    type: String,

    required: true,

    lowercase: true,

    trim: true,

    maxlength: 150

},

        contrasena: {

            type: String,

            required: true

        },

        telefono: {

            type: String,

            required: true,

            trim: true,

            maxlength: 15

        },

        rol: {

    type: String,

    enum: [

        "cliente",

        "tecnico"

    ],

    default: "cliente"

},

        foto_perfil_id: {

            type: mongoose.Schema.Types.ObjectId,

            default: null

        },

        correo_verificado: {

            type: Boolean,

            default: false

        },

        activo: {

            type: Boolean,

            default: true,

            index: true

        },

        ultimo_acceso: {

            type: Date,

            default: null

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

usuarioSchema.index({

    correo: 1

}, {

    unique: true

});

export default mongoose.model(

    "Usuario",

    usuarioSchema

);