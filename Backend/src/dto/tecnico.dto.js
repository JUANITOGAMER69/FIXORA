const tecnicoDTO = (tecnico) => {

    return {

        id: tecnico._id,

        usuario: {

            id: tecnico.usuario_id?._id,

            nombre: tecnico.usuario_id?.nombre,

            apellido: tecnico.usuario_id?.apellido,

            foto_perfil: tecnico.usuario_id?.foto_perfil

        },

        negocio: {

            nombre: tecnico.nombre_negocio,

            descripcion: tecnico.descripcion

        },
        distancia: tecnico.distancia_km ?? null,

        especialidades:

            tecnico.especialidades?.map(

                especialidad => ({

                    id: especialidad._id,

                    nombre: especialidad.nombre

                })

            ) || [],

        calificacion: tecnico.calificacion_promedio,

        trabajos_realizados: tecnico.trabajos_realizados,

        ciudad: tecnico.ciudad,

        estado: tecnico.estado,

        direccion: tecnico.direccion,

        ubicacion: tecnico.ubicacion,

        disponibilidad: tecnico.disponibilidad,

        creado_en: tecnico.createdAt

    };

};
        
export default tecnicoDTO;