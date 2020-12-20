const db = require('../models');


module.exports = {

    // Agregar una nueva Categoria 
    add : async (req, res, next) => {
        try {    
            const registro = await db.categoria.create(req.body);
            res.status(200).json(registro);
        } catch (error) {
            res.status(500).send({
                message: 'Error ->' + error
            })
            next(error)
        }  
    },

    // Consular una categoría según su id enviado en la url
    query : async (req, res, next) => {
        try {    
            const registro = await db.categoria.create(req.body);
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

    // Eliminar una categoría según su id
    remove : async (req, res, next) => {
        try {    
            const registro = await db.categoria.destroy({ where: {
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

    // Listar las Categorias
    list : async (req, res, next) => {
        try {
            const registros = await db.categoria.findAll();
            if (registros) {
                res.status(200).json(registros);
            } else {
                res.status(404).send({
                    message: 'No existen categorias registradas en el sistema'
                })
            }        
        } catch (error) {
            res.status(500).send({
                message: 'Error ->' + error
            })
            next(error)
        }  
    },

    // Actualizar los Datos de una Categoria
    update : async (req, res, next) => {
        try {
            const registro = await db.categoria.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
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

    // Activar el registro de una Categoria
    activate : async (req, res, next) => {
        try {
            console.log(req.body.id)
            const registro = await db.categoria.update({estado:1},{
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

    // Desactivar el registro de una Categoria
    deactivate : async (req, res, next) => {
        try {
            const registro = await db.categoria.update({estado:0},{
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