import Tecnico from "../models/tecnico.model.js";

const tecnicoMiddleware = async (req, res, next) => {

    try {

        if (!req.usuario) {

            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado."
            });

        }

        const tecnico = await Tecnico.findOne({
            usuario_id: req.usuario._id
        });

        if (!tecnico) {

            return res.status(403).json({
                success: false,
                message: "Debes tener un perfil técnico."
            });

        }

        // Verificar que esté aprobado
        if (tecnico.estado_aprobacion !== "aprobado") {

            return res.status(403).json({
                success: false,
                message: "Tu perfil técnico aún no ha sido aprobado."
            });

        }

        // Guardamos el perfil técnico para usarlo después
        req.tecnico = tecnico;

        next();

    } catch (error) {

        next(error);

    }

};

export default tecnicoMiddleware;