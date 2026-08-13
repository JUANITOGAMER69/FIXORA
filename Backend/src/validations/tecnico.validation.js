import {body,validationResult} from "express-validator";

import mongoose from "mongoose";

export const validarTecnico = [

    body("usuario_id")

        .custom((value) => {

            if (!mongoose.Types.ObjectId.isValid(value)) {

                throw new Error("Usuario inválido.");

            }

            return true;

        }),

    body("especialidades")

        .isArray({

            min: 1

        })

        .withMessage(

            "Debe seleccionar al menos una especialidad."

        ),

    body("especialidades.*")

        .custom((value) => {

            if (!mongoose.Types.ObjectId.isValid(value)) {

                throw new Error(

                    "Especialidad inválida."

                );

            }

            return true;

        }),

    body("descripcion")

        .optional()

        .trim()

        .isLength({

            max: 500

        })

        .withMessage(

            "La descripción no puede superar los 500 caracteres."

        ),

    body("experiencia")

        .optional()

        .isInt({

            min: 0,

            max: 60

        })

        .withMessage(

            "La experiencia debe estar entre 0 y 60 años."

        ),

    body("radio_servicio")

        .optional()

        .isFloat({

            min: 1,

            max: 100

        })

        .withMessage(

            "El radio de servicio debe estar entre 1 y 100 km."

        ),

    body("promedio_calificacion")

        .optional()

        .isFloat({

            min: 0,

            max: 5

        })

        .withMessage(

            "La calificación debe estar entre 0 y 5."

        ),

    body("trabajos_realizados")

        .optional()

        .isInt({

            min: 0

        })

        .withMessage(

            "Trabajos realizados inválido."

        ),

    body("disponibilidad")

        .optional()

        .isArray()

        .withMessage(

            "Disponibilidad inválida."

        ),

    body("documentos")

        .optional()

        .isArray()

        .withMessage(

            "Documentos inválidos."

        ),

    (req, res, next) => {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {

            return res.status(400).json({

                success: false,

                errors: errores.array()

            });

        }

        next();

    }
        
];
export const actualizarUbicacionValidation = [

    body("latitud")
        .notEmpty()
        .withMessage("La latitud es obligatoria.")
        .isFloat({
            min: -90,
            max: 90
        })
        .withMessage("Latitud inválida."),

    body("longitud")
        .notEmpty()
        .withMessage("La longitud es obligatoria.")
        .isFloat({
            min: -180,
            max: 180
        })
        .withMessage("Longitud inválida."),

    body("direccion")
        .optional()
        .trim(),

    body("ciudad")
        .optional()
        .trim(),

    body("estado")
        .optional()
        .trim(),

    body("codigo_postal")
        .optional()
        .trim()

];