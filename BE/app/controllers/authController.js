const argon2 = require('argon2');
const User = require('../models/User');
const createToken = require('../../utils/createToken')
const jwt = require("jsonwebtoken");

const authController = {
    // [POST]: /v1/auth/register
    register: async (req, res) => {
        const { username, password, phone, address, role } = req.body;

        if (!username || !password || !role) {
            return res.status(409).json({
                success: false,
                message: 'Thiếu thông tin tài khoản!'
            })
        }
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(401).json({
                    success: false,
                    message: 'Tên đăng nhập đã tồn tại!'
                })
            }

            const hashedPassword = await argon2.hash(password);
            const newUser = new User({
                username,
                password: hashedPassword,
                phone,
                address,
                role
            })
            await newUser.save();
            res.status(200).json({
                success: true,
                message: 'Đăng ký tài khoản thành công!'
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!'
            })
        }
    },
    // [POST]: /v1/auth/login
    login: async (req, res) => {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin đăng nhập!'
            })
        }
        try {
            const user = await User.findOne({ username }).select(['-createdAt', '-updatedAt', '-__v']);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Thông tin đăng nhập không chính xác!'
                })
            }

            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Thông tin đăng nhập không chính xác!'
                })
            }

            if (user.role !== role) {
                return res.status(401).json({
                    success: false,
                    message: 'Thông tin đăng nhập không chính xác!'
                })
            }

            const accessToken = createToken.generateAccessToken(user);
            const refreshToken = createToken.generateRefreshToken(user);
            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công!',
                user: {
                    userId: user._id,
                    username: user.username,
                    phone: user.phone,
                    address: user.address,
                    role: user.role,
                    accessToken
                },
                refreshToken
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!'
            })
        }
    },
    // [LOGOUT]: /v1/auth/logout
    logout: async (req, res) => {
        console.log('req.headers.token in logout: ', req.headers.token);
        try {
            return res.status(200).json({
                success: true,
                message: 'Đăng xuất thành công!'
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!'
            })
        }
    },
    requestRefreshToken: async (req, res) => {
        try {
            const refreshToken = req.body.refreshToken;
            console.log('refreshToken: ', refreshToken);
            if (!refreshToken) return res.status(401).json("You're not authenticated tại refreshToken!");
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err) {
                        console.log('Logout');
                        return res.status(401).json(null);
                    } else {
                        const newAccessToken = createToken.generateAccessToken(user);
                        const newRefreshToken = createToken.generateRefreshToken(user);
                        return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
                    }
                }
            )
        } catch (err) {
            return res.status(500).json(err);
        }
    },
}

module.exports = authController;