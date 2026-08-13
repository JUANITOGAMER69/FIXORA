import usuarioService from "../services/usuario.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

class UsuarioController {

    async registrar(req, res, next) {

        try {

            const usuario =

                await usuarioService.registrar(

                    req.body

                );

            res.status(

                HTTP_STATUS.CREATED

            ).json({

                success: true,

                message: "Usuario registrado correctamente.",

                data: usuario

            });

        } catch (error) {

            next(error);

        }

    }

    async login(req, res, next) {

        try {

            const {

                correo,

                contrasena

            } = req.body;

            const respuesta =

                await usuarioService.login(

                    correo,

                    contrasena

                );

            res.status(

                HTTP_STATUS.OK

            ).json({

                success: true,

                message: "Inicio de sesión exitoso.",

                token: respuesta.token,

                data: respuesta.usuario

            });

        } catch (error) {

            next(error);

        }

    }

    async obtenerPerfil(req, res, next) {

        try {

            const usuario =

                await usuarioService.obtenerPorId(

                    req.usuario.id

                );

            res.status(

                HTTP_STATUS.OK

            ).json({

                success: true,

                data: usuario

            });

        } catch (error) {

            next(error);

        }

    }

    async actualizarPerfil(req, res, next) {

        try {

            const usuario =

                await usuarioService.actualizar(

                    req.usuario.id,

                    req.body

                );

            res.status(

                HTTP_STATUS.OK

            ).json({

                success: true,

                message: "Perfil actualizado.",

                data: usuario

            });

        } catch (error) {

            next(error);

        }

    }

    async eliminar(req, res, next) {

        try {

            await usuarioService.eliminar(

                req.usuario.id

            );

            res.status(

                HTTP_STATUS.OK

            ).json({

                success: true,

                message: "Usuario eliminado."

            });

        } catch (error) {

            next(error);

        }

    }
        async obtenerTodos(req, res, next) {

    try {

        const usuarios = await usuarioService.obtenerTodos();

        return res.status(HTTP_STATUS.OK).json({

            success: true,

            data: usuarios

        });

    } catch (error) {

        next(error);

    }

}
}

export default new UsuarioController();