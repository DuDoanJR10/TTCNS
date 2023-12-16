const Room= require('../models/Room');
const Staff = require('../models/Staff');

const roomController = {
    // [GET]: /v1/api/room/get-all
    async getAll(req, res) {
        try {
            const listRoom = await Room.find({}).populate('staffs');
            return res.status(200).json({
                success: true,
                message: 'Láy danh sách phòng ban thành công!',
                listRoom
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

module.exports = roomController;