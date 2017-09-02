"use strict";

let q = require('q'),
    pageModel = new (require('./base'))();

pageModel._collection = 'pages';

pageModel.update = (data) => {
    var deferred = q.defer();
    pageModel.collection().update({name: data.name}, {$set: data}, {}, (iErr, iRes) => {
        (iErr) ? deferred.reject(iErr) : deferred.resolve(iRes);
    });
    return deferred.promise;
};

module.exports = pageModel;
