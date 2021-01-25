const models = require('../models');
const categories = require('../models').categories;

module.exports = {
    add: async (req, res, next) => {
        try {
            const reg = await models.products.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(400).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    list: async (req, res, next) => {
        try {
            const reg = await models.products.findAll({
                include: [
                    { model: categories, as: 'categories'}
                ]
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(400).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    update: async(req, res, next) => {
        try {
            const reg = await models.products.update({
                name: req.body.name,
                code: req.body.code,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                categoryId: req.body.categoryId
            }, {where: {id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(400).send({
                message: 'Ocurrió un error'
            });
            next(error)
        }
    },
    activate: async(req, res, next) => {
        try {
            const reg = await models.products.update({status: 1}, {where: {id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(400).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.products.update({status: 0}, {where: {id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(400).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}