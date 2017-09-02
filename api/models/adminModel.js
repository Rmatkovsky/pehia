"use strict";

var _ = require('lodash');

var adminModel = new (require('./base'))();
adminModel._collection = 'admins';

module.exports = adminModel;
