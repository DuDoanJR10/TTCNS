const express = require('express');
const router = express.Router();
const middlewareVerify = require('../app/middlewares/verify');
const authController = require('../app/controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post("/refresh", authController.requestRefreshToken);
router.post('/logout', middlewareVerify.verifyToken, authController.logout);

module.exports = router;