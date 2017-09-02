"use strict";

var _ = require('lodash'),
    q = require('q');

class Base {
    constructor () {
        this._db = global.db;
    }
    collection() {
        return this._db.collection(this._collection);
    }
    aggregate(query){
        var deferred = q.defer();
        this.collection().aggregate(query, (iErr, iRes) => {
            (iErr) ? deferred.reject(iErr) : deferred.resolve(iRes);
        });
        return deferred.promise;
    }
    insert(data) {
        var deferred = q.defer();
        this.collection().insert(data, (iErr, iRes) => {
            (iErr) ? deferred.reject(iErr) : deferred.resolve(iRes);
        });
        return deferred.promise;
    }
    update(data) {
        var deferred = q.defer();
        this.collection().update({_id: data._id}, {$set: data}, {}, (iErr, iRes) => {
            (iErr) ? deferred.reject(iErr) : deferred.resolve(iRes);
        });
        return deferred.promise;
    }
    find(query, params, sort) {
        var deferred = q.defer();
        this.collection().find(query || {}, params || {}).sort(sort || {}).toArray((iErr, iRes) => {
            (iErr) ? deferred.reject(iErr) : deferred.resolve(iRes);
        });
        return deferred.promise;
    }
    findOne(query) {
        var deferred = q.defer();
        this.collection().findOne(query, (iErr, iRes) => {
            (iErr || !iRes) ? deferred.reject(iErr) : deferred.resolve(iRes);
        });
        return deferred.promise;
    }
    remove(query) {
        var deferred = q.defer();
        this.collection().remove(query, {}, (iErr, iRes) => {
            (iErr) ? deferred.reject(iErr) : deferred.resolve(iRes);
        });
        return deferred.promise;
    }
    convertStrToUrl( iString ) {
        return iString.replace(/[^a-zA-Z0-9]+?/g, '_').replace(/_{2,}/g,'_').toLowerCase();
    }
}
module.exports = Base;
