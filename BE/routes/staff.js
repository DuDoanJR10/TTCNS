const staffController = require('../app/controllers/staffController');
const middlewareVerify = require("../app/middlewares/verify");

const router = require("express").Router();

router.get('/get-all', middlewareVerify.verifyAdmin, staffController.getAll);
router.post('/add', middlewareVerify.verifyAdmin, staffController.addStaff);
router.post('/update', middlewareVerify.verifyAdmin, staffController.updateStaff);
router.delete('/:id', middlewareVerify.verifyAdmin, staffController.deleteStaff);

module.exports = router
