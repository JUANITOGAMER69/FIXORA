import Usuario from "../models/usuario.model.js";

class UsuarioRepository {

    async crear(datos) {

        return await Usuario.create(datos);

    }

    async buscarPorId(id) {

        return await Usuario.findById(id);

    }

    async buscarPorCorreo(correo) {

        return await Usuario.findOne({

            correo: correo.toLowerCase()

        });

    }

    async actualizar(id, datos) {

        return await Usuario.findByIdAndUpdate(

            id,

            datos,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async eliminar(id) {

        return await Usuario.findByIdAndDelete(id);

    }
    async obtenerTodos() {

    return await Usuario.find()
        .select("-contrasena")
        .sort({
            created_at: -1
        });

}
    async actualizarFotoPerfil(id, foto_perfil) {

    return Usuario.findByIdAndUpdate(

        id,

        {

            foto_perfil

        },

        {

            new: true

        }

    );

}
}

export default new UsuarioRepository();