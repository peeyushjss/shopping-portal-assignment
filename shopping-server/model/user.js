'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * @module  User
 * @description contain the details of user  
 */

let UserSchema = new Schema({

  /** 
    User email. It can only contain string, is required field and unique field which is indexed.
  */
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },

  /** 
    Mobile Number. It can only contain number, is required field and unique field which is indexed.
  */
  mobile: {
    type: Number,
    unique: true,
    required: true
  },

  /** 
    Name. It can containg string, is required field
  */
  name: {
    type: String,
    required: true
  },

  /** 
    Password. It can only contain string, is required field.
  */
  password: {
    type: String,
    required: true
  },

  /** 
    Address. It can only contain string, is required field.
  */
  address: {
    type: String,
    required: true
  }

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }    //seting toJSON option on the schema, so that virtual works when it return json data

});

UserSchema.path('email').validate(function (email) {
  let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email); // Assuming email has a text attribute
}, 'Invalid email id.');

UserSchema.path('mobile').validate(function (mobile) {
  let mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
}, 'Invalid phone number.');

UserSchema.statics.getUser = function (query, callback) {
  this.findOne(query, callback);
};

UserSchema.statics.createUser = function (requestData, callback) {
  this.create(requestData, callback);
};

let user = mongoose.model('user', UserSchema);

/** export schema */
module.exports = {
  User: user
};