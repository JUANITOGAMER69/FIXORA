import {

    body,

    validationResult

} from "express-validator";

export const validarEspecialidad = [

    body("nombre")

        .trim()

        .notEmpty()

        .withMessage("El nombre es obligatorio.")

        .isLength({

            min: 3,

            max: 80

        })

        .withMessage(

            "El nombre debe tener entre 3 y 80 caracteres."

        ),

    body("descripcion")

        .optional()

        .isLength({

            max: 250

        })

        .withMessage(

            "La descripción no puede superar los 250 caracteres."

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