import { body, validationResult } from "express-validator";

/*
=========================================
Validaciones para Registro
=========================================
*/

export const validarRegistro = [

    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio."),

    body("apellido_paterno")
        .trim()
        .notEmpty()
        .withMessage("El apellido paterno es obligatorio."),

    body("correo")
        .trim()
        .isEmail()
        .withMessage("Correo electrónico inválido."),

    body("contrasena")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres."),

    body("rol")
        .isIn(["cliente", "tecnico"])
        .withMessage("Rol inválido."),

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

/*
=========================================
Validaciones para Login
=========================================
*/

export const validarLogin = [

    body("correo")
        .trim()
        .isEmail()
        .withMessage("Correo electrónico inválido."),

    body("contrasena")
        .notEmpty()
        .withMessage("La contraseña es obligatoria."),

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