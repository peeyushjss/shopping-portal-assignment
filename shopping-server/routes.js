'use strict';

// Load modules

const User = require('./controller/user'),
    Order = require("./controller/order");

// API Server Endpoints
module.exports = (app) => {

    /* route for sign up */
    app.route('/api/user')
        .post(User.create);

    /* route for login */
    app.route('/api/login')
        .post(User.login);

    /* router for place order */
    app.route("/api/order")
        .post(Order.createOrder);

}