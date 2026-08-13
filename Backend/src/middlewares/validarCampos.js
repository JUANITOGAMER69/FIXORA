import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errores.array()

        });

    }

    next();

};

export default validarCampos;