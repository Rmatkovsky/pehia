"use strict";
let _ = require('lodash'),
    videoModel = new (require('./base'))(),
    ObjectId = require('mongodb').ObjectId,
    categoryModel = require('./categoryModel'),
    q = require('q');

videoModel._collection = 'videos';
videoModel.limit = 20;
videoModel.state = {
    'new': 'new',
    'approve': 'approve',
    'decline': 'decline',
    'delete': 'delete'
};
videoModel.validateValues = {
    title: {
        minLength: 2,
        maxLength: 120
    }
};

videoModel.insert = (iCid, iData) => {
    return categoryModel.collection().update({_id: iCid}, {$addToSet: {videos: iData}});
};

videoModel.getByCategory = (iCid, iSort, iState, skip) => {
    let query = [
        {$unwind: '$videos'},
        {$match: (iCid) ? {'_id': iCid} : {'videos.id':{$exists:true}}},
        {$match: {'videos.state': iState}},
        {$sort: iSort || {}},
        {$skip: skip || 0},
        {$limit: videoModel.limit || 0}
    ];
    return categoryModel.aggregate(query);
};

videoModel.getByCategoryCount = (iCid, iSort, iState) => {
    let query = [
        {$unwind: '$videos'},
        {$match: (iCid) ? {'_id': iCid} : {'videos.id':{$exists:true}}},
        {$match: {'videos.state': iState}},
        {$sort: iSort || {}},
        {$group: {_id: null, count: {$sum: 1}}}
    ];
    return categoryModel.aggregate(query);
};

videoModel.getByCategoryByLinkCount = (iCLink, iState) => {
    let query = [
        {$unwind: '$videos'},
        {$match: (iCLink) ? {'link': iCLink} : {'videos.id':{$exists:true}}},
        {$match: {'videos.state': iState}},
        {$group: {_id: null, count: {$sum: 1}}}
    ];
    return categoryModel.aggregate(query);
};

videoModel.getByCategoryLink = (iCLink, iSort, iLimit, skip) => {
    let query = [
        {$unwind: '$videos'},
        {$match: (iCLink) ? {'link': iCLink} : {'videos.id':{$exists:true}}},
        {$sort: iSort || {}},
        {$match: {'videos.state': videoModel.state.approve}},
        {$skip: skip || 0},
        {$limit: iLimit}
    ];
    return categoryModel.aggregate(query);
};

videoModel.findByLink = iLink => {
    let deferred = q.defer();

    categoryModel.aggregate([{$unwind: '$videos'},{$match:{'videos.link': iLink }} ])
        .then((iResult) => {
            (iResult.length) ? deferred.resolve(iResult) : deferred.reject(false);
        })
        .catch((iErr) => {
            deferred.reject(iErr);
        });
    return deferred.promise;
};

videoModel.findById = iId => {
    let deferred = q.defer();

    categoryModel.aggregate([{$unwind: '$videos'},{$match:{'videos.id':{$in: [iId]}}} ])
    .then((iResult) => {
        (iResult.length) ? deferred.resolve(iResult) : deferred.reject(false);
    })
    .catch((iErr) => {
        deferred.reject(iErr);
    });
    return deferred.promise;
};

videoModel.findByIdWithCat = (iId, iCat) => {
    let deferred = q.defer();

    categoryModel.aggregate([{$unwind: '$videos'},{$match:{'videos.id':{$in: [iId]}, '_id': iCat }} ])
        .then((iResult) => {
            (iResult.length) ? deferred.resolve(iResult) : deferred.reject(false);
        })
        .catch((iErr) => {
            deferred.reject(iErr);
        });
    return deferred.promise;
};

videoModel.changeCategory = (iId, iCid) => {
    let video = {};
    iCid = new ObjectId(iCid);

    return videoModel.findById(iId)
        .then((iResult) => {
            video = iResult[0]['videos'];
            return videoModel.remove(iId);
        })
        .then(() =>{
            return videoModel.insert(iCid, video);
        });
};

videoModel.getMostPopular = (iLimit, skip) => {
    let query = [
        {$unwind: '$videos'},
        {$match: {'videos.id': {$exists: true}}},
        {$match: {'videos.state': videoModel.state.approve}},
        {$sort: {'videos.review': -1}},
        {$skip: skip || 0},
        {$limit: iLimit}
    ];
    return categoryModel.aggregate(query);
};

videoModel.getMostPopularCount = () => {
    let query = [
        {$unwind: '$videos'},
        {$match: {'videos.id': {$exists: true}}},
        {$match: {'videos.state': videoModel.state.approve}},
        {$sort: {'videos.review': -1}},
        {$group: {_id: null, count: {$sum: 1}}}
    ];
    return categoryModel.aggregate(query);
};

videoModel.getLatest = (iLimit, skip) => {
    let query = [
        {$unwind: '$videos'},
        {$match: {'videos.id': {$exists: true}}},
        {$match: {'videos.state': videoModel.state.approve}},
        {$sort: {'videos.addDate': -1}},
        {$skip: skip || 0},
        {$limit: iLimit}
    ];
    return categoryModel.aggregate(query);
};

videoModel.getLatestCount = () => {
    let query = [
        {$unwind: '$videos'},
        {$match: {'videos.id': {$exists: true}}},
        {$match: {'videos.state': videoModel.state.approve}},
        {$sort: {'videos.addDate': -1}},
        {$group: {_id: null, count: {$sum: 1}}}
    ];
    return categoryModel.aggregate(query);
};

videoModel.getPrimary = () => {
    let query = [
        {$unwind: '$videos'},
        {$match: {'primary': true,'videos.id': {$exists: true}}},
        {$match: {'videos.state': videoModel.state.approve}},
        {$limit: 8}
    ];

    return categoryModel.aggregate(query);
};

videoModel.getVideoByFilter = iFilter => {
    let query = [
        {$unwind: '$videos'},
        {$match: iFilter}
    ];

    return categoryModel.aggregate(query);
};

videoModel.update = iData => {
    return categoryModel.collection().update({'videos.id':iData['id']}, {$set: {'videos.$': iData}});
};

videoModel.remove = iId => {
    return categoryModel.collection().update({}, {$pull: {'videos': {'id': iId}}}, {multi: true});
};

module.exports = videoModel;
