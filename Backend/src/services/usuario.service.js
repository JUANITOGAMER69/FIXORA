import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usuarioRepository from "../repositories/usuario.repository.js";
import { MENSAJES } from "../constants/mensajes.js";

class UsuarioService {

    /* =========================================
       Registrar usuario
    ========================================= */

    async registrar(datos) {

        const usuarioExistente =
            await usuarioRepository.buscarPorCorreo(
                datos.correo
            );

        if (usuarioExistente) {

            throw new Error(
                MENSAJES.USUARIO_EXISTE
            );

        }

        const hash = await bcrypt.hash(
            datos.contrasena,
            10
        );

        datos.contrasena = hash;

        const usuario =
            await usuarioRepository.crear(datos);

        return this.formatearUsuario(usuario);

    }

    /* =========================================
       Login
    ========================================= */

    async login(correo, contrasena) {

        const usuario =
            await usuarioRepository.buscarPorCorreo(
                correo
            );

        if (!usuario) {

            throw new Error(
                MENSAJES.CREDENCIALES_INVALIDAS
            );

        }

        const coincide =
            await bcrypt.compare(
                contrasena,
                usuario.contrasena
            );

        if (!coincide) {

            throw new Error(
                MENSAJES.CREDENCIALES_INVALIDAS
            );

        }

        usuario.ultimo_acceso = new Date();

        await usuario.save();

        const token = jwt.sign(

            {

                id: usuario._id,

                rol: usuario.rol

            },

            process.env.JWT_SECRET,

            {

                expiresIn: process.env.JWT_EXPIRES_IN || "7d"

            }

        );

        return {

            usuario: this.formatearUsuario(usuario),

            token

        };

    }

    /* =========================================
       Obtener perfil
    ========================================= */

    async obtenerPorId(id) {

        const usuario =
            await usuarioRepository.buscarPorId(id);

        if (!usuario) {

            throw new Error(
                MENSAJES.USUARIO_NO_ENCONTRADO
            );

        }

        return this.formatearUsuario(usuario);

    }

    /* =========================================
       Obtener todos
    ========================================= */

    async obtenerTodos() {

        const usuarios =
            await usuarioRepository.obtenerTodos();

        return usuarios.map(usuario =>
            this.formatearUsuario(usuario)
        );

    }

    /* =========================================
       Actualizar
    ========================================= */

    async actualizar(id, datos) {

        if (datos.contrasena) {

            datos.contrasena = await bcrypt.hash(
                datos.contrasena,
                10
            );

        }

        const usuario =
            await usuarioRepository.actualizar(
                id,
                datos
            );

        if (!usuario) {

            throw new Error(
                MENSAJES.USUARIO_NO_ENCONTRADO
            );

        }

        return this.formatearUsuario(usuario);

    }

    /* =========================================
       Eliminar
    ========================================= */

    async eliminar(id) {

        return await usuarioRepository.eliminar(id);

    }

    /* =========================================
       Usuario Seguro
    ========================================= */

    formatearUsuario(usuario) {

        return {

            _id: usuario._id,

            nombre: usuario.nombre,

            apellido: usuario.apellido,

            correo: usuario.correo,

            telefono: usuario.telefono,

            rol: usuario.rol,

            foto: usuario.foto,

            estado: usuario.estado,

            ultimo_acceso: usuario.ultimo_acceso,

            createdAt: usuario.createdAt,

            updatedAt: usuario.updatedAt

        };

    }

}

export default new UsuarioService();