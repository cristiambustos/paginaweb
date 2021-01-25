const models = require('../models');

module.exports = {
    add: async (req, res, next) => {
        try {
            const reg = await models.categories.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    list: async (req, res, next) => {
        try {
            const reg = await models.categories.findAll();
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
        const reg = await models.categories.update({ name: req.body.name, description: req.body.description}, {where: {id: req.body.id}});
        res.status(200).json(reg);
        } catch(error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.categories.update({ status: 1}, {where: {id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurró un error'
            });
            next(error);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.categories.update({ status: 0}, {where: { id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}
