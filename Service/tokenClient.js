const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../secret/config');

module.exports = {
    encode: async(id, email) => {
        const token = jwt.sign({ id: id, email: email}, config.secret, { expiresIn: 86400});
        return token;
    },
    decode: async(token) => {
        try {
            const {id} = await jwt.verify(token, config.secret);
            const client = await models.clients.findOne( {where: {id, status: 1}});
            if (client) {
                return client
            } else {
                return false
            }
        } catch (error) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}
