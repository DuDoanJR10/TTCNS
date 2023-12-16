const jwt = require('jsonwebtoken');

const middlewareVerify = {
    verifyToken: (req, res, next) => {
        const token = req?.headers?.token;
        if (req?.headers?.expired) {
            next();
        } else {
            if (token) {
                const accessToken = token.split(' ')[1];
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY,
                    (err, user) => {
                        if (err) {
                            return res.status(403).json("Token is invalid!");
                        }
                        req.user = user;
                        next();
                    }
                );
            } else {
                return res.status(401).json("You're not authenticated!");
            }
        }
    },
    verifyAdmin: (req, res, next) => {
        middlewareVerify.verifyToken(req, res,  () => {
            if (req.user?.role === 'admin') {
                next();
            } else if (req?.headers?.expired) {
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: "strict" // Prevent attack CSRF 
                });
                return res.status(200).json({
                    success: false,
                    message: "Vui lòng đăng nhập lại!",
                    toHome: true
                })
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'Tài khoản không thực hiện được chức năng này!'
                });
            }
        })
    }
}

module.exports = middlewareVerify;