const db = require('../models');

module.exports = {

        // Adicionar un nuevo Articulo
        add : async (req, res, next) => {
            try {    
                const registro = await db.articulo.create(req.body);
                res.status(200).json(registro);
            } catch (error) {
                res.status(500).send({
                    message: 'Error ->' + error
                })
                next(error)
            }  
        },

        // Listar los Articulos
        list : async (req, res, next) => {
            try {
                const registros = await db.articulo.findAll({
                    include: [{
                        model: db.categoria,
                        as: 'detalle-categoria', // from model categoria
                        required: true, // Registro innerJoin solo a un modelo asociado                
                        // atributes: ["id", "nombre", "descripcion"]
                    }],
                }); 
                if (registros) {
                    res.status(200).json(registros);
                } else {
                    res.status(404).send({
                        message: 'No existen Articulos en el sistema'
                    })
                }        
            } catch (error) {
                res.status(500).send({
                    message: 'Error ->' + error
                })
                next(error)
            }  
        },

        // Consular un articulo según su id enviado en la url
        query : async (req, res, next) => {
            try {    
                const registro = await db.articulo.create(req.body);
                if (!registro) {
                    res.status(404).send({
                        message: "El registro no existe"
                    });
                } else {
                    res.status(200).json(registro);
                }           
            } catch (error) {
                res.status(500).send({
                    message: 'Error ->' + error
                });
                next(error);
            }  
        },

        // Eliminar un articulo según su id
        remove : async (req, res, next) => {
            try {    
                const registro = await db.articulo.destroy({ where: {
                    _id: req.body.id }});
                if (!registro) {
                    res.status(404).send({
                        message: "El registro no existe"
                    });
                } else {
                    res.status(200).json(registro);
                }           
            } catch (error) {
                res.status(500).send({
                    message: 'Error ->' + error
                });
                next(error);
            }  
        },

        // Actualizar los Datos de un Articulo
        update : async (req, res, next) => {
            try {
                const registro = await db.articulo.update({        
                    codigo: req.body.codigo,
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    precio_venta: req.body.precio_venta,
                    stock: req.body.stock,
                    // estado: req.body.estado,
                    categoriaId: req.body.categoriaId
                }, { 
                    where: { id: req.body.id }
                });
                res.status(200).json(registro);

            } catch (error) {
                res.status(500).send({
                    message: 'Error ->' + error
                })
                next(error)
            }  
        },

        // Activar el registro de un Articulo
        activate : async (req, res, next) => {
            try {
                const registro = await db.articulo.update({estado:1},{
                    where: { id: req.body.id }
                });
                res.status(200).json(registro);
            } catch (error) {
                res.status(500).send({
                    message: 'Error ->' + error
                });
                next(error)
            }  
        },

        // Desactivar el registro de un Articulo
        deactivate : async (req, res, next) => {
            try {
                const registro = await db.articulo.update({estado:0},{
                    where: { id: req.body.id }
                });
                res.status(200).json(registro);
            } catch (error) {
                res.status(500).send({
                    message: 'Error ->' + error
                });
                next(error)
            }  
        },
}