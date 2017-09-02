"use strict";

var categoryModel = require('../models/categoryModel'),
    videoModel = require('../models/videoModel'),
    pageModel = require('../models/pageModel'),
    validator = require('validator'),
    Pagination = require('../libs/pagination');

class mainController {
    constructor(app) {
        this.app = app;

        this.app.get('/', this.mainHandler.bind(this));
        this.app.get('/category/popular', this.popularHandler.bind(this));
        this.app.get('/category/latest', this.latestHandler.bind(this));
        this.app.get('/category/:name/:sort*?', this.categoryHandler.bind(this));
        this.app.get('/video/:link', this.videoHandler.bind(this));
        this.app.get('/page/:name', this.pageHandler.bind(this));
        this.app.get('/404/', this.page404Handler.bind(this));
        this.app.post('/getMoreVideo', this.getMoreVideoHandler.bind(this));
    }

    mainHandler(iReq, iRes) {
        let categories = [],
            mostPopularVideos = [],
            latestVideos = [],
            primaryVideos = [];

        categoryModel.getCategories()
        .then(iResult => {
            categories = iResult;
            return videoModel.getMostPopular(8);
        })
        .then(iResult => {
            mostPopularVideos = iResult;
            return videoModel.getLatest(8);
        })
        .then(iResult => {
            latestVideos = iResult;
            return videoModel.getPrimary();
        })
        .then(iResult => {
            primaryVideos = iResult;

            let data = {
                categories: categories,
                mostPopularVideos: mostPopularVideos,
                latestVideos: latestVideos,
                primaryVideos: primaryVideos
            };

            iRes.render('index', data);
        });
    };

    popularHandler(iReq, iRes) {
        let categories = [],
            query = iReq['query'],
            page = query['page'] || 1,
            totalRecords = 0,
            skip =0;

        categoryModel.getCategories()
            .then(iResult => {
                categories = iResult;
                return videoModel.getMostPopularCount();

            })
            .then(iResult => {
                totalRecords = (iResult.length) ? iResult[0]['count'] : 0;
                skip = ( page ) ? ( page -1 ) * videoModel.limit : 0;
                return videoModel.getMostPopular(videoModel.limit, skip);
            })
            .then(iResult => {
                let pagination = new Pagination(page, videoModel.limit, totalRecords),
                    data = {
                        categories: categories,
                        videos: iResult,
                        categoryName: 'Most popular',
                        pagination: pagination.render('./views/pagination.html', query)
                    };

                iRes.render('category', data);
            });
    };

    latestHandler(iReq, iRes) {
        let categories = [],
            query = iReq['query'],
            page = query['page'] || 1,
            totalRecords = 0,
            skip =0;

        categoryModel.getCategories()
            .then(iResult => {
                categories = iResult;
                return videoModel.getLatestCount();
            })
            .then(iResult => {
                totalRecords = (iResult.length) ? iResult[0]['count'] : 0;
                skip = ( page ) ? ( page -1 ) * videoModel.limit : 0;
                return videoModel.getLatest(videoModel.limit, skip);
            })
            .then(iResult => {
                let pagination = new Pagination(page, videoModel.limit, totalRecords),
                    data = {
                        categories: categories,
                        videos: iResult,
                        categoryName: 'Latest videos',
                        pagination: pagination.render('./views/pagination.html', query)
                    };

                iRes.render('category', data);
            });
    };

    categoryHandler(iReq, iRes) {
        let params = iReq['params'],
            categories = [],
            query = iReq['query'],
            page = query['page'] || 1,
            selectedCategory = params['name'],
            category = null,
            sort = (params['sort'] == 'latest' ) ? 'latest' : 'popular',
            sortQuery = null,
            totalRecords = 0,
            skip = 0;

        categoryModel.getCategories()
        .then(iResult => {
            categories = iResult;
            return categoryModel.findByLink(selectedCategory);
        })
        .then(iResult => {
            category = iResult;
            sortQuery = (sort == 'latest' ) ? {'videos.addDate': -1} : {'videos.review': -1};
            return videoModel.getByCategoryByLinkCount(selectedCategory, videoModel.state.approve);
        })
        .then( iResult => {
            totalRecords = (iResult.length) ? iResult[0]['count'] : 0;
            skip = ( page ) ? ( page -1 ) * videoModel.limit : 0;

            return videoModel.getByCategoryLink(selectedCategory, sortQuery, videoModel.limit, skip);
        })
        .then(iResult => {
            let
                pagination = new Pagination(page, videoModel.limit, totalRecords),
                data = {
                    categories: categories,
                    selectCategory: category,
                    videos: iResult,
                    isSort: true,
                    sort: sort,
                    pagination: pagination.render('./views/pagination.html', query),
                    seo: category.seo
                };

            iRes.render('category', data);
        })
        .catch(() => {
            iRes.redirect('/404');
        });
    }

    videoHandler(iReq, iRes) {
        let params = iReq['params'],
            headers = iReq['headers'],
            parsedUrl = iReq['_parsedUrl'],
            link = params['link'],
            video = [],
            categories = [],
            fullLink = `http://${headers['host']}${parsedUrl['pathname']}`,
            totalRecords = 0;

        categoryModel.getCategories()
            .then(iResult => {
                categories = iResult;
                return videoModel.findByLink(link);
            })
            .then(iResult => {
                video = iResult;
                return videoModel.getByCategoryByLinkCount(video[0].link, videoModel.state.approve);
            })
            .then(iResult => {
                totalRecords = (iResult.length) ? iResult[0]['count'] : 0;
                return videoModel.getByCategoryLink(video[0].link, {'videos.addDate': -1}, 8);
            })
            .then(iResult => {
                let data = {
                    video: video[0]['videos'],
                    mostPopularVideos: iResult,
                    categories: categories,
                    selectCategory: video[0],
                    fullLink: fullLink,
                    totalRecords: totalRecords,
                    seo: video[0]['videos']['seo']
                };

                iRes.render('video', data);
            })
            .catch(() => {
                return iRes.redirect('/404');
            });
    };

    pageHandler(iReq, iRes) {
        let params = iReq['params'],
            name = params['name'],
            categories = [];

        categoryModel.getCategories()
        .then(iResult => {
            categories = iResult;
            return pageModel.findOne({name: name});
        })
        .then(iResult => {

            iRes.render('page', {categories: categories, page: iResult});
        })
        .catch(() => {
            iRes.redirect('/404');
        });
    }

    page404Handler(iReq, iRes) {
        let categories = [];

        categoryModel.getCategories()
            .then(iResult => {
                categories = iResult;
                iRes.render('404', {categories: categories});
            });
    }

    getMoreVideoHandler(iReq, iRes) {
        let body = iReq['body'],
            categoryName = body['category'],
            skip = body['skip'] || 0;

            skip = ( validator.isNumeric( skip ) && skip ) ? ( skip - 1 ) * 8 : 0;

            videoModel.getByCategoryLink(categoryName,{'videos.addDate': -1}, 8, skip)
            .then( iResult => {
                return iRes.status(200).json({'result': iResult});
            })
            .catch(() => {
                iRes.status(204).json({'result': []});
            });

    }

};

module.exports = mainController;
