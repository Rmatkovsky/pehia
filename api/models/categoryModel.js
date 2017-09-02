"use strict";
var _ = require('lodash'),
    q = require('q'),
    ObjectId = require('mongodb').ObjectId;

var categoryModel = new (require('./base'))();

categoryModel.validateValues = {
        name: {
            minLength: 2,
            maxLength: 50
        },
        keywords: {
            minLength: 2,
            maxLength: 200
        }
    };

categoryModel._collection = 'categories';

categoryModel.getCategories = () => {
    return categoryModel.find(
        {'videos':{$exists:true, $ne: []},'videos.state': 'approve'},
        {},
        {order: 1}
    );
};

categoryModel.findById = iId => {
    let deferred = q.defer();

    categoryModel.findOne({_id: iId})
        .then((iResult) => {
            deferred.resolve(iResult);
        })
        .catch(()=>deferred.reject(false));

    return deferred.promise;
};

categoryModel.findByLink = iLink => {
    let deferred = q.defer();

    categoryModel.findOne({link: iLink})
        .then((iResult) => {
            deferred.resolve(iResult);
        })
        .catch(()=>deferred.reject(false));

    return deferred.promise;
};

categoryModel.updateOrder = (iId, iOrder) => {
    let deferred = q.defer();
    iId = new ObjectId(iId);
    iOrder = ~~iOrder;

    categoryModel.findById(iId)
    .then(iResult => {
        let category = iResult;
        category.order = iOrder;
        return categoryModel.collection().update({'_id':iId}, category);

    })
    .then((iRes)=>deferred.resolve(iRes))
    .catch((iErr)=>deferred.reject(iErr));

    return deferred.promise;
};

categoryModel.updatePrimary = iId => {
    let deferred = q.defer();

    categoryModel.collection().update({'_id':{ '$ne': iId}}, { $set:{'primary': false}}, { 'multi': true})
        .then((iRes)=>deferred.resolve(iRes))
        .catch((iErr)=>deferred.reject(iErr));

    return deferred.promise;
};

categoryModel.getAll = () => {
    return categoryModel.find({});
};

module.exports= categoryModel;
