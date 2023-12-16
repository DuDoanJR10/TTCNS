const categoryController = require("../app/controllers/categoryController");
const middlewareVerify = require("../app/middlewares/verify");

const router = require("express").Router();

router.get('/get-all', categoryController.getAll);
router.post('/add', middlewareVerify.verifyAdmin, categoryController.addCategory);
router.post('/update', middlewareVerify.verifyAdmin, categoryController.updateCategory);
router.delete('/:id', middlewareVerify.verifyAdmin, categoryController.deleteCategory);
module.exports = router;