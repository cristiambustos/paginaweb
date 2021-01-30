const models = require('../models');
const bcrypt = require('bcryptjs');
const token = require('../Service/token.js');

module.exports = {
    login: async(req, res, next) => {
        try {
            let user = await models.users.findOne({ where: { email: req.body.email}});
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user.id, user.rol);
                    res.status(200).json({user, tokenReturn});
                } else {
                    res.status(400).send({
                        message: 'Password incorrect!'
                    });
                }
            } else {
                res.status(401).send({
                    message: 'User no found!'
                })
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
            const reg = await models.users.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    list: async(req, res, next) => {
        try {
            const reg = await models.users.findAll();
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    update: async(req, res, next) => {
        try {
            let clave = req.body.password;
            const reg = await models.users.findOne({ where: {email: req.body.email}});
            if (clave != reg.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg2 = await models.users.update({ name: req.body.name, email: req.body.email, password: req.body.password, rol: req.body.rol}, { where: { id: req.body.id}});
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
            const reg = await models.users.update({ status: 1}, { where: {id: req.body.id}});
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
            const reg = await models.users.update({ status: 0}, {where: {id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}