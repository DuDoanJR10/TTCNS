const jwt = require('jsonwebtoken');

const middlewareVerify = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        console.log('token in verifyToken: ', token);
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, 
                (err, user) => {
                    if (err) {
                        return res.status(403).json({ success: false, message: "Token is invalid tại verifyToken!" });
                    }
                    console.log('user: ', user);
                    req.user = user;
                    next();
                }
            );
        } else {
            if (req.headers.expired) {
                return res.status(401).json({ success: false, message: "Vui lòng đăng nhập lại!", expired: true})
            } 
            return res.status(401).json({ success: false, message: "You're not authenticated tại verifyToken!" });
        }
    },
}

module.exports = middlewareVerify;