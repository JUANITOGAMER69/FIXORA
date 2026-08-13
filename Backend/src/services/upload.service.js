import cloudinary from "../config/cloudinary.js";

import usuarioRepository from "../repositories/usuario.repository.js";

import tecnicoRepository from "../repositories/tecnico.repository.js";

import { CLOUDINARY_FOLDERS } from "../constants/cloudinaryFolders.js";

import servicioRepository from "../repositories/servicio.repository.js";

class UploadService {

    async subirArchivo(file, folder) {

        return new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(

                {
                    folder
                },

                (error, result) => {

                    if (error) {

                        return reject(error);

                    }

                    resolve(result);

                }

            );

            stream.end(file.buffer);

        });

    }

    async eliminarArchivo(publicId) {

        return await cloudinary.uploader.destroy(publicId);

    }

    async subirFotoPerfil(usuarioId, file) {

        const usuario =
            await usuarioRepository.obtenerPorId(usuarioId);

        if (!usuario) {

            throw new Error("Usuario no encontrado.");

        }

        const resultado =
            await this.subirArchivo(

                file,

                "fixora/perfiles"

            );

        await usuarioRepository.actualizar(

            usuarioId,

            {

                foto_perfil: resultado.secure_url,

                foto_perfil_public_id: resultado.public_id

            }

        );

        return await usuarioRepository.obtenerPorId(usuarioId);

    }

    async subirDocumentoTecnico(usuarioId, file, tipo) {

    // Buscar el perfil técnico
    const tecnico = await tecnicoRepository.obtenerPorUsuario(usuarioId);

    if (!tecnico) {

        throw new Error("El usuario no tiene un perfil técnico.");

    }

    // Subir el archivo a Cloudinary
    const resultado = await this.subirArchivo(

        file,

        CLOUDINARY_FOLDERS.DOCUMENTOS

    );

    // Crear objeto del documento
    const documento = {

        nombre: file.originalname,

        tipo,

        url: resultado.secure_url,

        public_id: resultado.public_id,

        fecha_subida: new Date()

    };

    // Guardar en MongoDB
    await tecnicoRepository.agregarDocumento(

        tecnico._id,

        documento

    );

    // Devolver documento creado
    return documento;

}
        async subirImagenServicio(usuarioId, servicioId, file) {

    // Buscar técnico por usuario
    const tecnico = await tecnicoRepository.obtenerPorUsuario(usuarioId);

    if (!tecnico) {

        throw new Error("El usuario no tiene un perfil técnico.");

    }

    // Buscar servicio
    const servicio = await servicioRepository.obtenerPorId(servicioId);

    if (!servicio) {

        throw new Error("Servicio no encontrado.");

    }

    // Verificar propietario
    if (servicio.tecnico_id.toString() !== tecnico._id.toString()) {

        throw new Error(
            "No tienes permiso para modificar este servicio."
        );

    }

    // Máximo 10 imágenes
    if (servicio.imagenes.length >= 10) {

        throw new Error(
            "El servicio ya tiene el máximo de imágenes permitido."
        );

    }

    // Subir imagen
    const resultado = await this.subirArchivo(

        file,

        CLOUDINARY_FOLDERS.SERVICIOS

    );

    // Crear objeto
    const imagen = {

        url: resultado.secure_url,

        public_id: resultado.public_id,

        fecha_subida: new Date()

    };

    // Guardar en Mongo
    await servicioRepository.agregarImagen(

        servicioId,

        imagen

    );

    // Regresar servicio actualizado
    return await servicioRepository.obtenerPorId(servicioId);

}
}

export default new UploadService();