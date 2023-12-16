const Room = require('../models/Room');
const Staff = require('../models/Staff');

const staffController = {
    // [GET]: /v1/api/staff/get-all
    async getAll(req, res) {
        try {
            const listStaff = await Staff.find({}).populate('room');
            return res.status(200).json({
                success: true,
                message: 'Láy danh sách nhân viên thành công!',
                listStaff
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại!',
                error
            })
        }
    }
}

module.exports = staffController;