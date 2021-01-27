const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../secret/config.js');

    module.export = {
        encode: async(id, rol) => {
            const token = jwt.sign({ id: id, rol: rol}, config.secret, { expiresIn: 86400});
            return token;
        },
        decode: async(token) => {
            try {
                const { id } = await jwt.verify(token, config.secret);
                const user = await models.users.findOne({ where: {id, status: 1}});
                if (user) {
                    return user;
                } else {
                    return false;
                }
            } catch (error) {
                const newToken = await checkToken(token);
                return newToken;
            }
        }
    }