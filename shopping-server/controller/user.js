'use strict';

const mongoose = require('mongoose'),
    user = mongoose.model('user'),
    config = require('../config/config'),
    encryption = require('../utility/encryption'),
    async = require('async'),
    jwt = require('jsonwebtoken');

let privateKey = config.key.privateKey;

/**
   POST: /user
 */

exports.create = (req, res, next) => {
    console.log("Entered into Register API : ", JSON.stringify(req.body));
    console.log("Header:" + req.headers.authorization);
    if (req.body.password == undefined) {
        return res.json({ status: false, message: "missing password!" });
    }
    req.body.password = encryption.encrypt(req.body.password);

    user.createUser(req.body, (err, createduser) => {
        if (!err) {
            return res.json({ status: true, result: createduser, message: "User registered successfully!" });
        } else {
            if (11000 === err.code || 11001 === err.code)
                return res.json({ status: false, error: err, message: "dublicate userid, email, or phone number" });
            else
                return res.json({ status: false, error: err, message: "oops something went wrong!" });
        }
    });
};

/**
   POST: /login
 */

exports.login = (req, res) => {
    console.log("Entered into login API : ", JSON.stringify(req.body));
    console.log("Header:" + req.headers.authorization);
    async.waterfall([
        (callback) => {
            user.getUser({
                email: req.body.email
            }, (err, result) => {
                if (err) {
                    callback({ status: false, error: err, message: "Oops something went wrong!!" });
                } else {
                    if (result) {
                        callback(null, result)
                    } else {
                        callback({ status: false, error: err, message: "Invalid username or password" });
                    }
                }
            });
        },
        (user, callback) => {
            console.log(req.body.password);
            console.log(encryption.decrypt(user.password));
            if (req.body.password == encryption.decrypt(user.password)) {
                let response = {
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    mobile: user.mobile
                };
                response.token = jwt.sign(response, privateKey);
                callback(null, response);
            } else {
                callback({ status: false, message: "Invalid username or password!" });
            }
        },
    ], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json({ status: true, result: result, message: "User login successfully!" });
        }
    });
};