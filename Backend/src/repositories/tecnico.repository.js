import Tecnico from "../models/tecnico.model.js";

class TecnicoRepository {

    async crear(datos) {

        return await Tecnico.create(datos);

    }

    async obtenerTodos() {

        return await Tecnico.find()

            .populate("usuario_id")

            .populate("especialidades")

            .sort({

                promedio_calificacion: -1

            });

    }

    async obtenerPorId(id) {

        return await Tecnico.findById(id)

            .populate("usuario_id")

            .populate("especialidades");

    }

    async obtenerPorUsuario(usuarioId) {

        return await Tecnico.findOne({

            usuario_id: usuarioId

        })

            .populate("usuario_id")

            .populate("especialidades");

    }

    async obtenerPorEstado(estado) {

        return await Tecnico.find({

            estado_aprobacion: estado

        })

            .populate("usuario_id")

            .populate("especialidades");

    }

    async actualizar(id, datos) {

        return await Tecnico.findByIdAndUpdate(

            id,

            datos,

            {

                new: true,

                runValidators: true

            }

        )

            .populate("usuario_id")

            .populate("especialidades");

    }

    async eliminar(id) {

        return await Tecnico.findByIdAndDelete(id);

    }

    async existeUsuario(usuarioId) {

        return await Tecnico.exists({

            usuario_id: usuarioId

        });

    }
    /**
 * Agrega un documento al arreglo documentos
 */
async agregarDocumento(idTecnico, documento) {

    return await Tecnico.findByIdAndUpdate(

        idTecnico,

        {
            $push: {
                documentos: documento
            }
        },

        {
            new: true,
            runValidators: true
        }

    );

}

/**
 * Elimina un documento por su _id
 */
async eliminarDocumento(idTecnico, idDocumento) {

    return await Tecnico.findByIdAndUpdate(

        idTecnico,

        {
            $pull: {
                documentos: {
                    _id: idDocumento
                }
            }
        },

        {
            new: true
        }

    );

}

/**
 * Obtiene únicamente los documentos del técnico
 */
async obtenerDocumentos(idTecnico) {

    const tecnico = await Tecnico.findById(idTecnico)
        .select("documentos");

    return tecnico?.documentos || [];

}
        async actualizarUbicacion(idTecnico, data) {

    return await Tecnico.findByIdAndUpdate(

        idTecnico,

        {

            ubicacion: {

                type: "Point",

                coordinates: [

                    Number(data.longitud),

                    Number(data.latitud)

                ]

            },

            direccion: data.direccion,

            ciudad: data.ciudad,

            estado: data.estado,

            codigo_postal: data.codigo_postal

        },

        {

            new: true,

            runValidators: true

        }

    );

}
        async buscarTecnicos(filtros) {

    const {

        latitud,

        longitud,

        distancia = 10000,

        especialidad,

        ciudad,

        estado,

        calificacionMinima,

        ordenar = "distancia"

    } = filtros;

    const query = {

        activo: true,

        estado_aprobacion: "aprobado"

    };

    // Filtro por ciudad
    if (ciudad) {

        query.ciudad = ciudad;

    }

    // Filtro por estado
    if (estado) {

        query.estado = estado;

    }

    // Filtro por calificación
    if (calificacionMinima) {

        query.calificacion_promedio = {

            $gte: Number(calificacionMinima)

        };

    }

    // Filtro por especialidad
    if (especialidad) {

        query.especialidades = especialidad;

    }

    // Geolocalización
    if (latitud && longitud) {

        query.ubicacion = {

            $near: {

                $geometry: {

                    type: "Point",

                    coordinates: [

                        Number(longitud),

                        Number(latitud)

                    ]

                },

                $maxDistance: Number(distancia)

            }

        };

    }

    let consulta = Tecnico.find(query)

.populate({

    path: "usuario_id",

    select: "nombre apellido foto_perfil"

})

.populate({

    path: "especialidades",

    select: "nombre"

})

.skip(

    (Number(page) - 1) * Number(limit)

)

.limit(

    Number(limit)

);

    switch (ordenar) {

        case "calificacion":

            consulta = consulta.sort({

                calificacion_promedio: -1

            });

            break;

        case "trabajos":

            consulta = consulta.sort({

                trabajos_realizados: -1

            });

            break;

        default:

            break;

    }

   const total = await Tecnico.countDocuments(query);

const tecnicos = await consulta;

return {

    total,

    page: Number(page),

    limit: Number(limit),

    totalPaginas: Math.ceil(total / Number(limit)),

    tecnicos

};

}
        async buscarTecnicosGeo(filtros) {

    const {

        latitud,

        longitud,

        distancia = 10000,

        page = 1,

        limit = 10

    } = filtros;

    const pipeline = [

        {

            $geoNear: {

                near: {

                    type: "Point",

                    coordinates: [

                        Number(longitud),

                        Number(latitud)

                    ]

                },

                distanceField: "distancia",

                maxDistance: Number(distancia),

                spherical: true,

                query: {

                    activo: true,

                    estado_aprobacion: "aprobado"

                }

            }

        },

        {

            $skip: (Number(page) - 1) * Number(limit)

        },

        {

            $limit: Number(limit)

        }

    ];
const tecnicos = await Tecnico.aggregate(pipeline);

return tecnicos.map(tecnico => ({

    ...tecnico,

    distancia_km:

        Number(

            (tecnico.distancia / 1000)

            .toFixed(2)

        )

}));
    return await Tecnico.aggregate(pipeline);

}
}

export default new TecnicoRepository();
