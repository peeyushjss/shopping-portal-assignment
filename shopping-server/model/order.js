'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
  * @module  Order
  * @description contain the details of order  
*/

let OrderSchema = new Schema({

  /** 
    User ID. It can only contain string, is required.
  */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  /** 
    Name. It can only contain string, is required.
  */
  name: { type: String, required: true },

  /** 
    Price, It can only contain number, is required.
  */
  price: { type: Number, required: true },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }    //seting toJSON option on the schema, so that virtual works when it return json data

});

OrderSchema.statics.createOrder = function (requestData, callback) {
  this.create(requestData, callback);
};

let order = mongoose.model('order', OrderSchema);

/** export schema */
module.exports = {
  Order: order
};