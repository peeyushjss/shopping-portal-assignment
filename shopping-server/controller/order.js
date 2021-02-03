'use strict';

const mongoose = require('mongoose'),
  order = mongoose.model('order'),
  config = require('../config/config'),
  async = require('async'),
  jwt = require('jsonwebtoken');

let privateKey = config.key.privateKey;

/**
   POST: /createOrder
 */

exports.createOrder = (req, res, next) => {
  console.log("Entered into order API : " + JSON.stringify(req.body));
  console.log("Header:" + req.headers.authorization);
  async.waterfall([
    (callback) => {
      let token = req.headers.authorization;
      jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
          callback({ status: false, error: err, message: 'Failed to authenticate user!' });
        } else {
          if (decoded)
            callback(null, decoded);
        }
      });
    },
    (decoded, callback) => {
      let obj = {
        "name": req.body.name,
        "price": req.body.price,
        "userId": decoded.userId,
      }
      order.createOrder(obj, (err, order) => {
        if (!err) {
          if (order) {
            callback(null, { status: true, result: order, message: "Order placed successfully" });
          } else {
            callback(null, { status: false, result: user, message: "Invalid order info" });
          }
        }
        else
          callback({ status: false, error: err, message: "oops something went wrong!" });
      });
    }], (err, result) => {
      if (err) {
        console.log(JSON.stringify(err));
        return res.json(err);
      } else {
        console.log(JSON.stringify(result));
        return res.json(result);
      }
    });
};