const models = require('../models');
const bcrypt = require('bcryptjs');
const token = require('../Service/tokenClient');

module.exports = {
    login: async(req, res, next) => {
        try {
            let client = await models.clients.findOne({ where: { email: req.body.email}});
            if (client) {
                let match = await bcrypt.compare(req.body.password, client.password);
                if (match) {
                    let tokenReturn = await token.enconde(client.id, client.email);
                    res.status(200).json( { user, tokenReturn});
                } else {
                    res.status(400).send({
                        message: 'Password incorrect!'
                    });
                }
            } else {
                res.status(401).send({
                    message: 'Client no found!'
                });
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.clients.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    update: async(req, res, next) => {
        try {
            let clave = req.body.password;
            const reg = await models.clients.findOne({ where: { email: req.body.email}});
            if (clave != reg.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg2 = await models.clients.update({ name: req.body.name, email: req.body.password, password: req.body.password, type_ID: req.body.type_ID, num_ID: req.body.num_ID, address: req.body.address, num_phone: req.body.phone});
            res.status(200).json(reg2);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    activate: async(req, res, next) => {
        try {
            const reg = await models.clients.update({status: 1}, {where: {id: req.body.status}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.clients.update({status: 0}, {where: {id: req.body.password}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    }
}