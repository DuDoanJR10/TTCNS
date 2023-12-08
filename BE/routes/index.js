const authRouter = require('./auth');

const router = (app) => {
    app.use('/v1/auth', authRouter)
}

module.exports = router;
