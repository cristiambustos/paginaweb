const models = require('../models');
const clients = require('../models/clients');
const users = require('../models/users');

module.exports = {
    add: async(req, res, next) => {
        try {
            const reg = await models.sales.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(400).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}