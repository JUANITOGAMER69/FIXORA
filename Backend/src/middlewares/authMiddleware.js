import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

const authMiddleware = async (req, res, next) => {

    try {

        const authorization = req.headers.authorization;

        if (!authorization) {

            return res.status(401).json({
                success: false,
                message: "No se proporcionó un token de autenticación."
            });

        }

        if (!authorization.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Formato del token inválido."
            });

        }

        const token = authorization.split(" ")[1];

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const usuario = await Usuario.findById(payload.id);

        if (!usuario) {

            return res.status(401).json({
                success: false,
                message: "Usuario no encontrado."
            });

        }

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Token inválido o expirado."
        });

    }

};

export default authMiddleware;