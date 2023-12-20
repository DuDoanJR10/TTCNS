const authRouter = require('./auth');
const categoryRouter = require('./category');
const accountRouter = require('./account');
const suppliesRouter = require('./supplies');
const roomRouter = require('./room');
const staffRouter = require('./staff');

const router = (app) => {
    app.use('/v1/auth', authRouter);
    app.use('/v1/api/category', categoryRouter);
    app.use('/v1/api/account', accountRouter);
    app.use('/v1/api/supplies', suppliesRouter);
    app.use('/v1/api/room', roomRouter);
    app.use('/v1/api/staff', staffRouter);
}

module.exports = router;
