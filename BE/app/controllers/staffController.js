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
    },
    // [POST]: /v1/api/staff/add
    async addStaff(req, res) {
        try {
            if (!req.body?.name) {
                return res.status(200).json({
                    success: false,
                    message: 'Thiếu thông tin nhân viên!'
                })
            }
            const staff = await Staff.findOne({ name: req.body?.name });
            if (staff) {
                return res.status(200).json({
                    success: false,
                    message: 'Nhân viên đã tồn tại!'
                })
            }
            const newStaff = new Staff(req.body);
            const staffSaved = await newStaff.save();
            if (req.body?.room) {
                const room = await Room.findById({ _id: req.body?.room });
                await room.updateOne({ $push: { staffs: staffSaved._id } });
            }
            let listStaff = await Staff.find({}).populate("room", );
            return res.status(200).json({
                success: true,
                message: 'Thêm mới nhân viên thành công!',
                listStaff
            })
        } catch (error) {
            
        }
    },
    // [POST]: /v1/api/staff/update
    async updateStaff(req, res) {
        try {
            const { name, id, room, phone } = req.body;
            const staff = await Staff.findOne({ name });
            if (staff && staff?._id.toString() !== id) {
                return res.status(200).json({
                    success: false,
                    message: 'Tên nhân viên đã tồn tại!'
                })
            }
            await Staff.updateOne(
                { _id: id },
                {
                    name,
                    room,
                    phone
                }
            );
            await Room.updateMany({ staffs: id }, { $pull: { staffs: id} })
            const roomNew = await Room.findById(room);
            await roomNew.updateOne({ $push: { staffs: id } });
            const listStaff = await Staff.find({}).populate("room");
            return res.status(200).json({
                success: true,
                message: 'Cập nhật nhân viên thành công!',
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
    },
    // [DELETE]: /v1/api/staff/:id
    async deleteStaff(req, res) {
        try {  
            const id = req.params.id;
            await Room.updateMany({ staffs: id }, { $pull: { staffs: id } });
            await Staff.findByIdAndDelete(id);
            const listStaff = await Staff.find({}).populate("room");
            return res.status(200).json({
                success: true,
                message: 'Xóa nhân viên thành công!',
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