const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config')


const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret().JWT_SECRET, {
        expiresIn: '1d',
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret().JWT_SECRET);
};

module.exports = { generateToken, verifyToken };