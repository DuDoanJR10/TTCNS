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
    },
    // [POST]: /v1/api/room/add
    async addRoom(req, res) {
        const { name, description } = req.body;
        if (!name) {
            return res.status(200).json({
                success: false,
                message: 'Thiếu thông tin phòng ban!'
            }) 
        }
        try {
            const room = await Room.findOne({ name });
            if (room) {
                return res.status(200).json({
                    success: false,
                    message: 'Phòng ban đã tồn tại!'
                })
            }
            const newRoom = new Room({ name, description });
            await newRoom.save();
            const listRoom = await Room.find({}); 
            res.status(200).json({
                success: true,
                message: 'Thêm phòng ban thành công!',
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
    },
    async deleteRoom(req, res) {
        const id = req.params.id;
        try {
            await Staff.updateMany({ staff: req.params.id }, { room: null });
            await Room.deleteOne({ _id: id });
            const listRoom = await Room.find({});
            return res.status(200).json({
                success: true,
                message: 'Xóa phòng ban thành công!',
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
    },
    async updateRoom(req, res) {
        const { name, description, id } = req.body;
        try {
            const room = await Room.findOne({ name });
            if (room && room?._id.toString() !== id) {
                return res.status(200).json({
                    success: false,
                    message: 'Tên phòng ban đã tồn tại!'
                })
            }
            await Room.updateOne(
                { _id: id },
                {
                    name,
                    description,
                }
            );
            const listRoom = await Room.find({});
            return res.status(200).json({
                success: true,
                message: 'Cập nhật phòng ban thành công!',
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