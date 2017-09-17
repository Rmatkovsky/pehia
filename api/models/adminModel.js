"use strict";

var _ = require('lodash');

var adminModel = new (require('./Base'))();
adminModel._collection = 'admins';

module.exports = adminModel;
