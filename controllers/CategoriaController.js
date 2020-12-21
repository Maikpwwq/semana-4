const models = require('../models');

const add = async (req, res, next) => {
    try {
        const reg = await models.Categoria.create(req.body);
        if (!reg) {
            res.status(404).send({ 
                message: "Error al crear la Categoria" 
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
        const reg = await models.Categoria.findOne({ 
            where: { id: req.query._id } 
        });
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
        const reg = await models.Categoria.findOne({ 
            where: { codigo: req.query.codigo}
        });
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

const list =  async (req, res, next) => {
    try {
        const reg = await models.Categoria.findAll();
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
        const reg = await models.Categoria.destroy({
            where: { id: req.body.id }
        });
        if (reg == 0) {
            res.status(404).send({ 
                message: "La categoria no existe" 
            });
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
        const reg = await models.Categoria.update({ 
            nombre: req.body.nombre, 
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
        }, { where: { id: req.body.id } });
        console.log(reg);
        if (reg == 0) {
            res.status(404).send({ 
                message: "La categoria no existe" 
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

const activate = async (req, res, next) => {
    try {
        console.log(req.body.id);
        const reg = await models.Categoria.update(
            { estado: 1 }, 
            { where: { id: req.body.id } }
        );
        console.log(reg);
        if (reg == 0) {
            res.status(404).send({ 
                message: "La categoria no existe" 
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

const deactivate = async (req, res, next) => {
    try {
        const reg = await models.Categoria.update(
            { estado: 0 }, 
            { where: { id: req.body.id } }
        );
        console.log(reg);
        if (reg == 0) {
            res.status(404).send({ 
                message: "La categoria no existe" 
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