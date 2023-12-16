const authRouter = require('./auth');
const categoryRouter = require('./category');
const accountRouter = require('./account');
const suppliesRouter = require('./supplies');
const roomRouter = require('./room');

const router = (app) => {
    app.use('/v1/auth', authRouter);
    app.use('/v1/api/category', categoryRouter);
    app.use('/v1/api/account', accountRouter);
    app.use('/v1/api/supplies', suppliesRouter);
    app.use('/v1/api/room', roomRouter);
}

module.exports = router;
