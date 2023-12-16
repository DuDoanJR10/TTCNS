const User = require('../models/User');

const accountController = {
    // [GET]: /v1/api/account/get-all
    getAll: async (req, res) => {
        try {
            const Accounts = await User.find({}).select(['-createdAt', '-updatedAt', '-__v']);
            return res.status(200).json({
                success: true,
                message: 'Lấy danh sách tài khoản thành công!',
                Accounts
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại!',
                error
            })
        }
    },
    // [POST]: /v1/api/account/add
    addAccount: async (req, res) => {
        const { username, password, phone, address, role } = req.body;
        if (!username || !password || !role) {
            return res.status(409).json({
                success: false,
                message: 'Thiếu thông tin tài khoản!'
            })
        }
        try {
            const account = await User.findOne({ username });
            if (account) {
                return res.status(200).json({
                    success: false,
                    message: 'Tên đăng nhập đã tồn tại!'
                })
            }
            const newAccount = new User({
                username,
                password,
                phone,
                address,
                role
            })
            await newAccount.save();
            const Accounts = await User.find({}).select(['-createdAt', '-updatedAt', '-__v']);
            res.status(200).json({
                success: true,
                message: 'Tạo tài khoản thành công!',
                Accounts
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!'
            })
        }
    },
    // [POST]: /v1/api/accounts/update
    async updateAccount(req, res) {
        const { id, username, password, phone, address, role } = req.body;
        if (!username || !password || !role) {
            return res.status(409).json({
                success: false,
                message: 'Thiếu thông tin tài khoản!'
            })
        }
        try {
            const account = await User.findOne({ username });
            if (account && account?._id.toString() !== id) {
                return res.status(200).json({
                    success: false,
                    message: 'Tên đăng nhập đã tồn tại!'
                })
            }
            await User.updateOne(
                { _id: id },
                {
                    username,
                    password,
                    phone,
                    address, 
                    role
                }
            )
            const Accounts = await User.find({});
            return res.status(200).json({
                success: true,
                message: 'Cập nhật tài khoản thành công!',
                Accounts
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!'
            })
        }
    },
    // [DELETE]: /v/api/account/:id
    deleteAccount: async (req, res) => {
        const id = req.params.id;
        try {
            await User.deleteOne({ _id: id });
            const Accounts = await User.find({});
            return res.status(200).json({
                success: true,
                message: 'Xóa tài khoản thành công!',
                Accounts
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại!',
                error
            })
        }
    },
}

module.exports = accountController;