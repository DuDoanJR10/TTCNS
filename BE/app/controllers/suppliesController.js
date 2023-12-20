const Supplies = require('../models/Supplies');
const Category = require('../models/Category');
const Export = require('../models/Export');

const suppliesController = {
    // [GET]: /v1/api/supplies/get-all
    async getAll(req, res) {
        try {
            let listSupplies = await Supplies.find({}).populate("category");
            return res.status(200).json({
                success: true,
                message: "Lấy danh sách vật tư và thiết bị thành công!",
                listSupplies
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
    // [POST]: /v1/api/supplies/add
    async addSupplies(req, res) {
        try {
            if (!req.body?.name) {
                return res.status(200).json({
                    success: false,
                    message: 'Thiếu thông tin vật tư!'
                })
            }
            const supplies = await Supplies.findOne({ name: req.body?.name });
            if (supplies) {
                return res.status(200).json({
                    success: false,
                    message: 'Vật tư đã tồn tại!'
                })
            }

            const newSupplies = new Supplies(req.body);
            const suppliesSaved = await newSupplies.save();
            if (req.body?.category) {
                const category = await Category.findById({ _id: req.body?.category });
                await category.updateOne({ $push: { supplies: suppliesSaved._id } });
            }
            let listSupplies = await Supplies.find({}).populate("category");
            return res.status(200).json({
                success: true,
                message: 'Thêm mới vật tư thành công!',
                listSupplies
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
    async updateSupplies(req, res) {
        try {
            const { name, description, category, brand, size, color, quantity, id, image } = req.body;
            const supplies = await Supplies.findOne({ name });
            if (supplies && supplies?._id.toString() !== id) {
                return res.status(200).json({
                    success: false,
                    message: 'Tên vật tư đã tồn tại!'
                })
            }
            await Supplies.updateOne(
                { _id: id },
                {
                    name,
                    description,
                    category,
                    brand,
                    size,
                    color,
                    quantity,
                    image
                }
            );
            await Category.updateMany({ supplies: id }, { $pull: { supplies: id } })
            const categoryNew = await Category.findById(category);
            await categoryNew.updateOne({ $push: { supplies: id } });
            const listSupplies = await Supplies.find({}).populate("category");
            return res.status(200).json({
                success: true,
                message: "Cập nhật vật tư thành công!",
                listSupplies
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
    // [GET]: /v1/api/supplies/get-all-export
    async getAllExport(req, res) {
        try {
            const listExport = await Export.find({}).populate('staff');
            return res.status(200).json({
                success: true,
                message: "",
                listExport
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
    // [POST]: /v1/api/supplies/export
    async exportSupplies(req, res) {
        try {
            const { supplies, name, room, staff, date } = req.body || {};
            console.log(supplies, name, room, staff, date);
            const newExport = new Export(req.body);
            supplies.map(async (supply) => {
                const supplyCurrent = await Supplies.findOne({ _id: supply.name });
                const newQuantity = supplyCurrent?.quantity - supply.quantity;
                await Supplies.updateOne(
                    { _id: supply.name },
                    {
                        quantity: newQuantity,
                    }
                );
            })
            await newExport.save();
            return res.status(200).json({
                success: true,
                message: 'Xuất thành công!',
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
    async deleteSupplies(req, res) {
        try {
            const id = req.params.id;
            await Category.updateMany({ supplies: id }, { $pull: { supplies: id } });
            await Supplies.findByIdAndDelete(id);
            const listSupplies = await Supplies.find({}).populate("category");
            return res.status(200).json({
                success: true,
                message: 'Xóa vật tư thành công!',
                listSupplies
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
    async uploadSupplies(req, res) {
        try {
            const path = req.file.path;
            if (path) {
                return res.status(200).json({
                    success: true,
                    message: 'Tải ảnh thành công!',
                    filePath: path
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: 'Tải ảnh thất bại!'
                })
            }
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

module.exports = suppliesController;