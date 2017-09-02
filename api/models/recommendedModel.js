"use strict";

let recommendedModel = new (require('./base'))(),
    Youtube = new (require('../libs/youtube'))(),
    Helpers = require('../libs/helpers'),
    videoModel = require('./videoModel'),
    q = require('q');

    recommendedModel.params = {
        maxResults: 10,
        order: 'viewCount',
        pageToken: null
    };

recommendedModel._collection = 'recommended';

recommendedModel.parseVideoByCategories = (iCategory, iIndex) => {
    iIndex = iIndex || 0;

    if( iIndex < iCategory.length) {
        recommendedModel.params.pageToken = null;
        recommendedModel.searchVideoByQuery(iCategory[iIndex],0)
        .then(() => {
            iIndex++;
            recommendedModel.parseVideoByCategories(iCategory, iIndex);
        });
    };
};

recommendedModel.searchVideoByQuery = (iCat, addedVideos) => {
    let listVideos = {};

    return Youtube.searchVideo(iCat['keywords'], recommendedModel.params)
        .then((iResult) => {
            listVideos = iResult;

            if( !listVideos['items'] || !listVideos['items'].length ) {
                recommendedModel.params.pageToken = null;
                return false;
            };

            return recommendedModel.addedVideos(iCat, listVideos['items'], 0, addedVideos);
        })
        .then(iResult => {
            addedVideos += iResult;

            if( ( addedVideos < recommendedModel.params.maxResults ) && listVideos['nextPageToken'] ) {
                recommendedModel.params.pageToken = listVideos['nextPageToken'];
                return recommendedModel.searchVideoByQuery(iCat, addedVideos);
            };
        });
};

recommendedModel.addedVideos = (iCat, iVideos, iIndex, iAddedVideos) => {
    let deferred = q.defer();
    iAddedVideos = iAddedVideos || 0;

    if( iAddedVideos < recommendedModel.params.maxResults && iVideos[iIndex] && iVideos[iIndex]['id']['videoId']) {
        let video = iVideos[iIndex];

        return videoModel.findById(video['id']['videoId'])
            .then(() => {
                iIndex++;
                return recommendedModel.addedVideos(iCat, iVideos, iIndex, iAddedVideos);
            })
            .catch(() => {

                return Youtube.getVideoInfo(video['id']['videoId'])
                    .then(iVideo => {
                        let data = {
                            id: iVideo['id'],
                            thumbnails: iVideo['snippet']['thumbnails'],
                            title: iVideo['snippet']['title'],
                            description: iVideo['snippet']['description'],
                            duration: Helpers.convertYTimeToStr(iVideo['contentDetails']['duration']),
                            review: parseInt(iVideo['statistics']['viewCount']),
                            addDate: new Date(),
                            state: videoModel.state.new,
                            link: videoModel.convertStrToUrl(iVideo['snippet']['title']),
                            seo: {
                                keywords: iCat.seo.keywords ,
                                description: iVideo['snippet']['title']
                            }
                        };

                        return videoModel.insert(iCat['_id'], data);
                    })
                    .then(() => {
                        iAddedVideos++;
                        iIndex++;
                        return recommendedModel.addedVideos(iCat, iVideos, iIndex, iAddedVideos);
                    });
            });
    };

    deferred.resolve(iAddedVideos);
    return deferred.promise;

};

recommendedModel.approveVideo = iId => {
    return videoModel.findById(iId)
    .then(iResult => {
        let video = iResult[0]['videos'];
        video.state = videoModel.state.approve;

        return videoModel.update(video);
    });
};

recommendedModel.declineVideo = iId => {
    return videoModel.findById(iId)
        .then(iResult => {
            let video = iResult[0]['videos'];
            video.state = videoModel.state.decline;

            return videoModel.update(video);
        });
};

recommendedModel.removeOldVideos = () => {
    let date = new Date();
    date.setDate(date.getDate()-7);

    videoModel.getVideoByFilter({'videos.addDate': {$lte: date}, 'videos.state': videoModel.state.new})
    .then(iResult => {
        iResult.forEach(item => {
            videoModel.remove(item['videos']['id']);
        });
    });
    
};

module.exports = recommendedModel;
