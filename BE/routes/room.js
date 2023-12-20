const middlewareVerify = require("../app/middlewares/verify");
const roomController = require('../app/controllers/roomController');

const router = require("express").Router();

router.get('/get-all', roomController.getAll);
router.post('/add', middlewareVerify.verifyAdmin, roomController.addRoom);
router.post('/update', middlewareVerify.verifyAdmin, roomController.updateRoom);
router.delete('/:id', middlewareVerify.verifyAdmin, roomController.deleteRoom);

module.exports = router;