const suppliesController = require('../app/controllers/suppliesController');
const { upload } = require('../app/middlewares/upload');
const middlewareVerify = require("../app/middlewares/verify");
const router = require("express").Router();

router.get('/get-all', suppliesController.getAll);
router.post('/add', middlewareVerify.verifyAdmin, suppliesController.addSupplies);
router.post('/update', middlewareVerify.verifyAdmin, suppliesController.updateSupplies);
router.post('/upload', upload.single('file'), suppliesController.uploadSupplies);
router.delete('/:id', middlewareVerify.verifyAdmin, suppliesController.deleteSupplies);

router.post('/export', middlewareVerify.verifyAdmin, suppliesController.exportSupplies);
router.get('/get-all-export', middlewareVerify.verifyAdmin, suppliesController.getAllExport);

router.get('/get-all-import', middlewareVerify.verifyAdmin, suppliesController.getAllImport);
router.post('/import', middlewareVerify.verifyAdmin, suppliesController.importSupplies);

router.post('/get-report', middlewareVerify.verifyAdmin, suppliesController.getReport);

module.exports = router