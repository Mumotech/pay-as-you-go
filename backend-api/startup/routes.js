const users = require('../routes/users');
const phone = require('../routes/phone');
const notFound = require('../middleware/notFound')
const error = require('../middleware/error')
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json())
    app.use('/api/v1/users', users);
    app.use('/api/v1/phones', phone);
    app.use(notFound);
    app.use(error);
}