const jwt = require('jsonwebtoken');

const createToken = {
    generateAccessToken: (user) => {
        return jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: '60s'
        })
    },
    generateRefreshToken: (user) => {
        return jwt.sign({ id: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: '1d'
        })
    }
}

module.exports = createToken;