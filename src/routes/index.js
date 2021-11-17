const siteRouter = require('./site');
const userRouter = require('./user');

function route(app) {
    app.use('/login', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
