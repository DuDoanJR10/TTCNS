const Supplies = require('../models/Supplies');
const Category = require('../models/Category');
const Export = require('../models/Export');
const Import = require('../models/Import');

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
    // [POST]: /v1/api/supplies/update
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
            const listExport = await Export.find({}).populate(['staff', 'room', 'supplies.name']);
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
            const { supplies, name, room, staff } = req.body || {};
            const exportExist = await Export.findOne({ name });
            if (exportExist) {
                return res.status(200).json({
                    success: false,
                    message: 'Tên phiếu xuất đã tồn tại!'
                })
            }
            let customSupplies = await Promise.all(supplies.map(async (supply) => {
                const supplyCurrent = await Supplies.findOne({ _id: supply.name }); 
                const newQuantity = supplyCurrent?.quantity - supply.quantity;
                await Supplies.updateOne(
                    { _id: supply.name },
                    {
                        quantity: newQuantity,
                    }
                );
                return {
                    ...supply,
                    quantityExport: supply.quantity,
                    oldQuantity: supplyCurrent?.quantity,
                    created: new Date()
                }
            }));
            const newExport = new Export({ supplies: customSupplies, name, room, staff });
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
    // [GET]: /v1/api/supplies/get-all-import
    async getAllImport(req, res) {
        try {
            const listImport = await Import.find({}).populate('supplies.name');
            return res.status(200).json({
                success: true,
                message: "",
                listImport
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
    // [POST]: /v1/api/supplies/import
    async importSupplies(req, res) {
        try {
            const { name, supplies } = req.body || {};
            const importExist = await Import.findOne({ name });
            if (importExist) {
                return res.status(200).json({
                    success: false,
                    message: 'Tên phiếu nhập đã tồn tại!'
                })
            }
            let customSupplies = await Promise.all(supplies.map(async (supply) => {
                const supplyCurrent = await Supplies.findOne({ _id: supply.name });
                const newQuantity = supplyCurrent?.quantity + supply.quantity;
                await Supplies.updateOne(
                    { _id: supply.name },
                    {
                        quantity: newQuantity,
                    }
                );
                return {
                    ...supply,
                    quantityImport: supply.quantity,
                    oldQuantity: supplyCurrent?.quantity,
                    created: new Date()
                }
            } ))
            const newImport = new Import({ name, supplies: customSupplies });
            await newImport.save();
            return res.status(200).json({
                success: true,
                message: 'Nhập thành công!',
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
    // [POST]: /v1/api/supplies/report
    async getReport(req, res) {
        try {
            const { fromDate, toDate } = req.body;
            console.log('date: ', fromDate, toDate);
            const importReport = await Import.find({ createdAt: { $gte: fromDate, $lte: toDate }});
            const exportReport = await Export.find({ createdAt: { $gte: fromDate, $lte: toDate }});
            return res.status(200).json({
                success: true,
                message: 'Lấy báo cáo thống kê thành công!',
                exportReport,
                importReport
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
    // [DELETE]: /v1/api/supplies/:id
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
    // [POST]: /v1/api/supplies/upload
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