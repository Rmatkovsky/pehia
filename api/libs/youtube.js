"use strict";

var google = require('googleapis'),
    youtubeApi =  google.youtube('v3'),
    key = require('../configs/google-credentials.json'),
    q = require('q'),
    scopes = [
                'https://www.googleapis.com/auth/youtube',
                'https://www.googleapis.com/auth/youtubepartner',
                'https://www.googleapis.com/auth/youtube.force-ssl'
            ],
    jwtClient = new google.auth.JWT(
            key.client_email, 
            null, 
            key.private_key, 
            scopes,
            null
        );

class Youtube {
    construct () {
        jwtClient.authorize((iErr, iTokens) => {
            if (iErr) {
                this.err = iErr;
                return this.err;
            };

            this.tokens = iTokens;
        });
    };

    getVideoInfo(iId) {
        let deferred = q.defer();

        youtubeApi.videos.list(
            {
                auth: jwtClient,
                "id": iId,
                "part": "id,snippet,statistics,contentDetails"
            },
            (iErr, iRes) => {
                if(iErr) {
                    return q.reject(iErr);
                };
                return (!iRes['items'].length) ? deferred.reject(false) : deferred.resolve(iRes.items[0]);
            });

        return deferred.promise;
    };

    searchVideo(iQuery, iParams) {
        let deferred = q.defer();

        youtubeApi.search.list(
            {
                auth: jwtClient,
                maxResults: iParams.maxResults,
                order: iParams.order,
                pageToken: iParams.pageToken,
                q: iQuery,
                part: "id"
            },
            (iErr, iRes) => {
                if(iErr) {
                    return q.reject(iErr);
                };

                return deferred.resolve(iRes);
            }
        );

        return deferred.promise;
    };
}

module.exports = Youtube;
