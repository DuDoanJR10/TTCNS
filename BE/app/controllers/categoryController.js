const Category = require('../models/Category');
const Supplies = require('../models/Supplies');

const categoryController = {
    // [GET]: /v1/api/category/get-all
    async getAll(req, res) {
        try {
            const Categories = await Category.find({}).populate('supplies');
            return res.status(200).json({
                success: true,
                message: 'Lấy danh sách sản phẩm thành công!',
                Categories
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
    // [POST]: /v1/api/category/add
    async addCategory(req, res) {
        const { name, description } = req.body;
        if (!name) {
            return res.status(200).json({
                success: false,
                message: 'Thiếu thông tin danh mục!'
            })
        }
        try {
            const category = await Category.findOne({ name });
            if (category) {
                return res.status(200).json({
                    success: false,
                    message: 'Danh mục đã tồn tại!'
                })
            }
            const newCategory = new Category({ name, description });
            await newCategory.save();
            const Categories = await Category.find({}); 
            res.status(200).json({
                success: true,
                message: 'Thêm danh mục thành công!',
                Categories
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
    // [POST]: /v1/api/category/update
    async updateCategory(req, res) {
        const { name, description, id } = req.body;
        try {
            const category = await Category.findOne({ name });
            if (category && category?._id.toString() !== id) {
                return res.status(200).json({
                    success: false,
                    message: 'Tên danh mục đã tồn tại!'
                })
            }
            await Category.updateOne(
                { _id: id },
                {
                    name,
                    description,
                }
            );
            const Categories = await Category.find({});
            return res.status(200).json({
                success: true,
                message: 'Cập nhật danh mục thành công!',
                Categories
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
    // [DELETE]: /v1/api/category/delete/:id
    async deleteCategory(req, res) {
        const id = req.params.id;
        try {
            await Supplies.updateMany({ category: req.params.id }, { category: null });
            await Category.deleteOne({ _id: id });
            const Categories = await Category.find({});
            return res.status(200).json({
                success: true,
                message: 'Xóa danh mục thành công!',
                Categories
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

module.exports = categoryController