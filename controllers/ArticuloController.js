const models = require('../models');

const add = async (req, res, next) => {
    try {
        const reg = await models.Articulo.create(req.body);
        if (!reg) {
            res.status(404).send({ 
                message: "Error al crear articulo" 
            });
        } else {
            res.status(200).json(reg);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }
};

const query = async (req, res, next) => {
    try {
        const reg = await models.Articulo.findOne({ 
            id: req.query.id 
        }).populate('detalle-categoria', {nombre:1});

        if (!reg) {
            res.status(404).send({
                message: 'El registro no existe'
            });
        } else {
            res.status(200).json(reg);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }
};

const queryCodigo = async(req, res, next) => {
    try {
        const reg = await models.Articulo.findOne({ 
            codigo: req.query.codigo 
        }).populate('detalle-categoria', { nombre: 1 });

        if (!reg) {
            res.status(404).send({
                message: 'El registro no existe'
            });
        } else {
            res.status(200).json(reg);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }
};

const list = async (req, res, next) => {
    try {
        const reg = await models.Articulo.findAll({
            /*include: [{
                model: models.Categoria, // from model categoria
                as: 'detalle-categoria', 
                required: true, // Registro innerJoin solo a un modelo asociado                
                // atributes: ["id", "nombre", "descripcion"]
            }],*/
        });
        res.status(200).json(reg);
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const reg = await models.Articulo.destroy({ 
            where: { id: req.body._id } //findByIdAndDelete
        });
        if (reg == 0) {
            res.status(404).send({ message: "El articulo no existe" });
        } else {
            res.status(200).json(reg);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e)
    }
};

const update = async (req, res, next) => {
    try {
        const reg = await models.Articulo.update({
            nombre: req.body.nombre, 
            descripcion: req.body.descripcion,
            precio_venta: req.body.precio_venta, 
            stock: req.body.stock,
            categoriaId: req.body.categoria, 
            codigo: req.body.codigo
        }, { where: { id: req.body.id } });
        if (reg == 0) {
            res.status(404).send({ message: "El articulo no existe" });
        } else {
            res.status(200).json(reg);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }
};

const activate = async (req, res, next) => {
    try {
        const reg = await models.Articulo.update(
            { estado: 1 }, 
            { where: { id: req.body.id } }
        );
        if (reg == 0) {
            res.status(404).send("El articulo no existe");
        } else {
            res.status(200).json(reg);
        }    
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }
};

const deactivate = async (req, res, next) => {
    try {
        const reg = await models.Articulo.update(
            { estado: 0 }, 
            { where: { id: req.body.id } }
        );
        if (reg == 0) {
            res.status(404).send("El articulo no existe");
        } else {
            res.status(200).json(reg);
        }    
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }
};

module.exports = {
    add,
    query,
    queryCodigo,
    list,
    update,
    remove,
    activate,
    deactivate
};