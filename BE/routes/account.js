const router = require("express").Router();
const accountController = require("../app/controllers/accountController");
const middlewareVerify = require('../app/middlewares/verify');

router.get('/get-all', middlewareVerify.verifyAdmin, accountController.getAll);
router.post('/add', middlewareVerify.verifyAdmin, accountController.addAccount);
router.delete('/:id', middlewareVerify.verifyAdmin, accountController.deleteAccount);
router.post('/update', middlewareVerify.verifyAdmin, accountController.updateAccount);

module.exports = router;