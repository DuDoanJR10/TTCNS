const middlewareVerify = require("../app/middlewares/verify");
const roomController = require('../app/controllers/roomController');

const router = require("express").Router();

router.get('/get-all', roomController.getAll);

module.exports = router;