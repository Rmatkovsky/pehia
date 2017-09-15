"use strict";

var adminModel = require('../models/adminModel'),
    categoryModel = require('../models/categoryModel'),
    videoModel = require('../models/videoModel'),
    pageModel = require('../models/pageModel'),
    recommendedModel = require('../models/recommendedModel'),
    ObjectId = require('mongodb').ObjectId,
    validator = require('validator'),
    Cookies = new (require('../libs/cookies'))(),
    Helpers = require('../libs/helpers'),
    Youtube = new (require('../libs/youtube'))(),
    url = require('url'),
    querystring = require('querystring'),
    errorHandler = require('../libs/errorHandler'),
    q = require('q'),
    Pagination = require('../libs/pagination');

class adminController{
    constructor(app) {
        this.app = app;

        this.app.get('/admin', this.mainHandler.bind(this));
        this.app.get('/admin/login', this.loginHandler.bind(this));
        this.app.get('/admin/logout', this.logoutHandler.bind(this));
        this.app.get('/admin/categories', this.categoryListHandler.bind(this));

        this.app.get('/admin/category/add', this.addCategoryView.bind(this));
        this.app.post('/admin/category/add', this.validateCategory.bind(this), this.addCategoryHandler.bind(this));

        this.app.get('/admin/category/:id/edit', this.editCategoryView.bind(this));
        this.app.post('/admin/category/:id/edit', this.validateCategory.bind(this), this.editCategoryHandler.bind(this));
        this.app.post('/admin/category/:id/changeOrder', this.changeCategoryOrderHandler.bind(this) );

        this.app.get('/admin/category/:id/delete', this.deleteCategoryHandler.bind(this));

        this.app.get('/admin/videos', this.videoListHandler.bind(this));
        this.app.post('/admin/videos', this.videoListHandler.bind(this));

        this.app.get('/admin/video/add', this.addVideoView.bind(this));
        this.app.post('/admin/video/add', this.validateVideo.bind(this), this.addVideoHandler.bind(this));

        this.app.get('/admin/video/:id/edit',this.editVideoView.bind(this));
        this.app.post('/admin/video/:id/edit',this.validateEditVideo.bind(this), this.editVideoHandler.bind(this));

        this.app.get('/admin/video/:id/delete',this.deleteVideoHandler.bind(this));
        this.app.get('/admin/video/:id/revert',this.revertVideoHandler.bind(this));

        this.app.get('/admin/page/:name',this.editPageView.bind(this));
        this.app.post('/admin/page/:name',this.editPageHandler.bind(this));

        this.app.get('/admin/recommended',this.recommendedView.bind(this));
        this.app.post('/admin/recommended',this.recommendedHandler.bind(this));

        this.app.get('/admin/recommended/:id/view',this.viewRecommendedVideo.bind(this));
        this.app.get('/admin/recommended/:id/approve',this.approveRecommendedVideo.bind(this));
        this.app.get('/admin/recommended/:id/decline',this.declineRecommendedVideo.bind(this));

        this.app.get('/admin/deleted', this.deletedVideoListHandler.bind(this));
    }

    validateCategory(iReq, iRes, iNext) {
        let body = iReq['body'],
            isName = validator.isLength(body['name'], categoryModel.validateValues.name.minLength, categoryModel.validateValues.name.maxLength),
            isKeywords = validator.isLength(body['keywords'], categoryModel.validateValues.keywords.minLength, categoryModel.validateValues.keywords.maxLength);

        if(!isName || !isKeywords) {
            Helpers.setNotify('error', {name: !isName, keywords: !isKeywords}, iRes);
            return iRes.redirect(iReq.get('referer'));
        };

        iNext();
    };

    validateVideo(iReq, iRes, iNext) {
        let body = iReq['body'],
            isURL = validator.isURL(body['url']),
            category = body['category'];

        if(!isURL || !ObjectId.isValid(category)) {
            Helpers.setNotify('error', {url: !isURL, category: !ObjectId.isValid(category)}, iRes);
            return iRes.redirect(iReq.get('referer'));
        };

        categoryModel.findOne({'_id': new ObjectId(category)})
            .then(()=>iNext())
            .catch(()=>{
                Helpers.setNotify('error', {message: 'error.add_video.category_not_found'}, iRes);
                return iRes.redirect(iReq.get('referer'));
            });
    };

    validateEditVideo(iReq, iRes, iNext) {
        let body = iReq['body'],
            isTitle = validator.isLength(body['title'], videoModel.validateValues.title.minLength, videoModel.validateValues.title.maxLength),
            category = body['category'];

        if(!isTitle || !ObjectId.isValid(category)) {
            Helpers.setNotify('error', {title: !isTitle, category: !ObjectId.isValid(category)}, iRes);
            return iRes.redirect(iReq.get('referer'));
        };

        categoryModel.findOne({'_id': new ObjectId(category)})
            .then(()=>iNext())
            .catch(()=>{
                Helpers.setNotify('error', {message: 'error.add_video.category_not_found'}, iRes);
                return iRes.redirect(iReq.get('referer'));
            });
    };

    loginHandler(iReq, iRes) {
        let notify = Helpers.getNotify(iReq);
        Helpers.removeNotifies(iRes);

        iRes.render('admin/login', {notify: notify});
    };

    logoutHandler(iReq, iRes) {
        Cookies.remove('userId', iRes);
        iRes.redirect('/admin/login');
    };

    mainHandler(iReq, iRes) {
        iRes.redirect('/admin/videos');
    };

    categoryListHandler(iReq, iRes) {
        let notify = Helpers.getNotify(iReq);
        Helpers.removeNotifies(iRes);

        categoryModel.find({}, {}, {order:1})
        .then( iResult => {
            let data = {
                notify: notify,
                categories: iResult
            };

            iRes.render('admin/categories', data );
        });
        Helpers.removeNotifies(iRes);
    };

    addCategoryView(iReq, iRes) {
        let notify = Helpers.getNotify(iReq);

        Helpers.removeNotifies(iRes);
        iRes.render('admin/category_add', {notify: notify});
    };

    addCategoryHandler(iReq, iRes) {
        let body     = iReq['body'],
            name     = body['name'],
            link     = videoModel.convertStrToUrl(name),
            keywords = body['keywords'],
            seoKeywords = body['seo_keywords'],
            seoDescription = body['seo_description'],
            primary  = !!body['primary'];

        categoryModel.findByLink(link)
            .then(()=>{
                Helpers.setNotify('error', {message: 'error.add_category.catgory_already_exists'}, iRes);
                return iRes.redirect('/admin/category/add');
            })
            .catch(()=>{
                let data = {
                    name: name,
                    keywords: keywords,
                    primary: primary,
                    seo: {
                        keywords: seoKeywords,
                        description: seoDescription
                    },
                    videos: [],
                    link: link,
                    order: 1000
                };
                categoryModel.insert(data)
                    .then((iResult) => {
                        let id = new ObjectId(iResult.insertedIds[0]);
                        return (primary) ? categoryModel.updatePrimary(id) : true;
                    })
                    .then(()=>{
                        Helpers.setNotify('success', {message: 'success.add_category.success'}, iRes);
                        iRes.redirect('/admin/categories');
                    })
                    .catch((ierr) => {
                        Helpers.setNotify('error', {message: 'error.add_category.cannot_add'}, iRes);
                        iRes.redirect('/admin/categories');
                    });
            });
    };

    editCategoryView(iReq, iRes) {
        let params = iReq['params'],
            id     = params['id'],
            notify = Helpers.getNotify(iReq);

        Helpers.removeNotifies(iRes);

        if(!ObjectId.isValid(id)){
            Helpers.setNotify('error',{ message: 'error.add_video.category_not_found'}, iRes);
            return iRes.redirect('/admin/categories');
        };

        id = new ObjectId(id);

        categoryModel.findOne({'_id': id })
            .then( iResult => {
                let data = {
                    id: id.toString(),
                    category: iResult,
                    notify: notify
                };
                iRes.render('admin/category_edit', data);
            })
            .catch(()=>{
                Helpers.setNotify('error', {message: 'error.add_category.cannot_find'}, iRes);
                iRes.redirect('/admin/categories');
            });
    };

    editCategoryHandler(iReq, iRes) {
        let params   = iReq['params'],
            id       = params['id'],
            body     = iReq['body'],
            primary  = !!body['primary'];

        if(!ObjectId.isValid(id)){
            Helpers.setNotify('error',{ message: 'error.add_video.category_not_found'}, iRes);
            return iRes.redirect('/admin/categories');
        };

        id = new ObjectId(id);
        let data = {
            _id: id,
            name: body['name'],
            keywords: body['keywords'],
            link: categoryModel.convertStrToUrl(body['name']),
            primary: primary,
            seo: {
                keywords: body['seo_keywords'],
                description: body['seo_description']
            }
        };

        categoryModel.update(data)
            .then(() => {
                return (primary) ? categoryModel.updatePrimary(id) : true;
            })
            .then(() => {
                Helpers.setNotify('success', {message: 'success.edit_category.success'}, iRes);
                iRes.redirect(iReq.get('referer'));
            })
            .catch(() => {
                Helpers.setNotify('error', {message: 'error.add_category.cannot_update'}, iRes);
                iRes.redirect(iReq.get('referer'));
            });
    };

    changeCategoryOrderHandler(iReq, iRes) {
        let params   = iReq['params'],
            body     = iReq['body'],
            id       = params['id'],
            order     = body['order'];

        if(!ObjectId.isValid(id)){
            return iRes.status(404).send({'error':'Not found'});
        };

        categoryModel.updateOrder(id, order)
        .then(() => {
            iRes.status(200).send({'status':'success'});
        });
    }

    deleteCategoryHandler(iReq, iRes) {
        let params = iReq['params'],
            id     = params['id'];

        if(!ObjectId.isValid(id)){
            Helpers.setNotify('error', {message: 'error.add_video.category_not_found'}, iRes);
            return iRes.redirect('/admin/categories');
        };

        id = new ObjectId(id);

        categoryModel.remove({_id: id})
            .then(() => {
                Helpers.setNotify('success', {message: 'success.add_category.delete_success'}, iRes);
                iRes.redirect('/admin/categories');
            })
            .catch(() => {
                Helpers.setNotify('error', {message: 'error.add_category.cannot_delete'}, iRes);
                iRes.redirect('/admin/videos');
            });
    }

    videoListHandler(iReq, iRes) {
        let query = iReq['query'],
            page = query['page'] || 1,
            categories = [],
            category = query['category'],
            notify = Helpers.getNotify(iReq),
            totalRecords = 0,
            skip = 0;

        Helpers.removeNotifies(iRes);

        categoryModel.getAll()
            .then(iResult => {
                categories = iResult;

                return videoModel.getByCategoryCount((category) ? new ObjectId(category) : null,
                    {'videos.addDate': -1},
                    videoModel.state.approve
                );
            })
            .then(iResult => {
                totalRecords = (iResult.length) ? iResult[0]['count'] : 0;
                skip = ( page ) ? ( page -1 ) * videoModel.limit : 0;

                return videoModel.getByCategory(
                    (category) ? new ObjectId(category) : null,
                    {'videos.addDate': -1},
                    videoModel.state.approve,
                    skip
                );
            })
            .then(iResult => {
                let  pagination = new Pagination(page, videoModel.limit, totalRecords),
                     data = {
                         categories: categories,
                         queryResult: iResult,
                         selectCategory: category,
                         notify: notify,
                         getCategoryName: Helpers.getCategoryName,
                         pagination: pagination.render('./views/admin/pagination.html', query)
                     };
                iRes.render('admin/videos', data);
            })
            .catch(()=>errorHandler.serviceUnavailable(iRes));
    }

    addVideoView(iReq, iRes) {
        let notify = Helpers.getNotify(iReq),
            categories = [];
        Helpers.removeNotifies(iRes);

         categoryModel.getAll()
            .then(iResult => {
                categories = iResult;
                let data = {
                    categories: categories,
                    notify: notify
                };

                iRes.render('admin/video_add', data);
            })
            .catch(()=>errorHandler.serviceUnavailable(iRes));
    };

    addVideoHandler(iReq, iRes) {
        let body = iReq['body'],
            categoryId = body['category'],
            category = null,
            urlOriginal = body['url'],
            urlParse = url.parse(urlOriginal),
            idYoutube = querystring.parse(urlParse.query)['v'];

        videoModel.findByIdWithCat(idYoutube, new ObjectId(categoryId))
            .then(() => {
                Helpers.setNotify('error', {message: 'error.add_video.video_already_exists'}, iRes);
                iRes.redirect('/admin/video/add');
            })
            .catch(() => {
                return categoryModel.findById(new ObjectId(categoryId));
            })
            .then( iResult => {
                category = iResult;
                return Youtube.getVideoInfo(idYoutube);
            })
            .then(iResult => {
                let data = {
                    id: iResult['id'],
                    thumbnails: iResult['snippet']['thumbnails'],
                    title: iResult['snippet']['title'],
                    description: iResult['snippet']['description'],
                    duration: Helpers.convertYTimeToStr(iResult['contentDetails']['duration']),
                    review: parseInt(iResult['statistics']['viewCount']),
                    addDate: new Date(),
                    state: videoModel.state.approve,
                    link: videoModel.convertStrToUrl(iResult['snippet']['title']),
                    seo: {
                        keywords: category.seo.keywords ,
                        description: iResult['snippet']['title']
                    }
                };
                return videoModel.insert(new ObjectId(categoryId), data);
            })
            .then(() => {
                iRes.redirect(`/admin/video/${idYoutube}/edit`);
            })
            .catch(()=>{
                Helpers.setNotify('error', {message: 'error.video.incorrect_link_or_service_unavailable'}, iRes);
                iRes.redirect('/admin/video/add');
            });
    };

    editVideoView(iReq, iRes) {
        let params = iReq['params'],
            id = params['id'],
            categories = [],
            notify = Helpers.getNotify(iReq);

        Helpers.removeNotifies(iRes);

        categoryModel.getAll()
            .then(iResult => {
                categories = iResult;
                return videoModel.findById( id );
            })
            .then( iResult => {
                let data = {
                    id: id,
                    notify: notify,
                    video: iResult[0].videos,
                    categoryId: iResult[0]._id.toString(),
                    categories: categories
                };

                iRes.render('admin/video_edit', data);
            })
            .catch(()=>{
                Helpers.setNotify('error', {message: 'error.video.not_found'}, iRes);
                return iRes.redirect('/admin/videos');
            });
    };

    editVideoHandler(iReq, iRes) {
        let params          = iReq['params'],
            body            = iReq['body'],
            id              = params['id'],
            title           = body['title'],
            description     = body['description'],
            seoKeywords     = body['seo_keywords'],
            seoDescription  = body['seo_description'],
            category        = body['category'];

        videoModel.findById(id)
        .then(iResult => {
            let video = iResult[0]['videos'];

            video.title = title;
            video.description = description;
            video.seo = {
                keywords: seoKeywords,
                description: seoDescription
            };
            video.link = videoModel.convertStrToUrl(title);

            return videoModel.update(video);
        })
        .then(() => {
            return videoModel.changeCategory(id, category);
        })
        .then(() => {
            Helpers.setNotify('success', {message: 'success.video.update.successful'}, iRes);
            iRes.redirect(`/admin/video/${id}/edit`);
        })
        .catch(()=>{
            Helpers.setNotify('error', {message: 'error.edit_video.update.fail'}, iRes);
            iRes.redirect('/admin/videos');
        });
    };

    deleteVideoHandler(iReq, iRes) {
        let params = iReq['params'],
            id     = params['id'];

        videoModel.remove(id)
            .then(() => {
                Helpers.setNotify('success', {message: 'success.video.delete.successful'}, iRes);
                iRes.redirect(iReq.get('referer'));
            })
            .catch(() => {
                Helpers.setNotify('error', {message: 'error.video.delete.fail'}, iRes);
                iRes.redirect('/admin/videos');
            });
    }

    revertVideoHandler(iReq, iRes) {
        let params = iReq['params'],
            id     = params['id'];

        videoModel.findById(id)
        .then(iResult => {
            let video = iResult[0]['videos'];
            video.state = videoModel.state.approve;

            return videoModel.update(video);
        })
            .then(() => {
                Helpers.setNotify('success', {message: 'success.video.revert.successful'}, iRes);
                iRes.redirect(iReq.get('referer'));
            })
            .catch(() => {
                Helpers.setNotify('error', {message: 'error.video.revert.fail'}, iRes);
                iRes.redirect('/admin/deleted');
            });
    }

    editPageView(iReq, iRes) {
        let params   = iReq['params'],
            name     = params['name'],
            notify = Helpers.getNotify(iReq);

        Helpers.removeNotifies(iRes);

        pageModel.findOne({name: name})
        .then(iResult => {
            iRes.render('admin/page', {page: iResult, notify: notify});
        })
        .catch(()=>{
            iRes.redirect(`/admin`);
        });
    };

    editPageHandler(iReq, iRes) {
        let params = iReq['params'],
            body   = iReq['body'],
            name   = params['name'],
            text   = body['text'];

        pageModel.update({name: name, text: text})
            .then(() => {
                Helpers.setNotify('success', {message: 'success.page.update.successful'}, iRes);
                iRes.redirect(`/admin/page/${name}`);
            })
            .catch(() => {
                Helpers.setNotify('error', {message: 'error.page.update.fail'}, iRes);
                iRes.redirect(`/admin/page/${name}`);
            });
    }

    recommendedView(iReq, iRes) {
        let query = iReq['query'],
            page = query['page'] || 1,
            categories = [],
            category = query['category'],
            notify = Helpers.getNotify(iReq),
            skip = 0,
            totalRecords;

        Helpers.removeNotifies(iRes);

        categoryModel.getAll()
            .then(iResult => {
                categories = iResult;
                return videoModel.getByCategoryCount((category) ? new ObjectId(category) : null,
                    {'videos.review': -1},
                    videoModel.state.new
                );
            })
            .then(iResult => {
                totalRecords = (iResult.length) ? iResult[0]['count'] : 0;
                skip = ( page ) ? ( page - 1 ) * videoModel.limit : 0;
                return videoModel.getByCategory(
                    (category) ? new ObjectId(category) : null,
                    {'videos.review': -1},
                    videoModel.state.new,
                    skip
                );
            })
            .then(iResult => {
                let pagination = new Pagination(page, videoModel.limit, totalRecords),
                    data = {
                        categories: categories,
                        queryResult: iResult,
                        selectCategory: category,
                        notify: notify,
                        getCategoryName: Helpers.getCategoryName,
                        pagination: pagination.render('./views/admin/pagination.html', query)
                };

                iRes.render('admin/recommended', data);
            })
            .catch(()=>errorHandler.serviceUnavailable(iRes));
    }

    recommendedHandler(iReq, iRes) {
        let body = iReq['body'],
            action = body['action'],
            selectVideos = ( typeof body['selectVideos'] == 'string' ) ? [ body['selectVideos'] ] : body['selectVideos'],
            promises = [];

        if(!selectVideos) {
            return iRes.redirect(`/admin/recommended`);
        };

        selectVideos.forEach(item => {
            promises.push(recommendedModel[ (action == 'approve') ? 'approveVideo' : 'declineVideo' ](item));
        });

        q.all(promises)
        .then(() => {
            Helpers.setNotify('success', {
                message: (action == 'approve')
                    ? 'success.recommended.approve.successful'
                    : 'success.recommended.decline.successful'
            }, iRes);
            iRes.redirect(`/admin/recommended`);
        })
        .catch(() => {
            Helpers.setNotify('success', {
                message: (action == 'approve')
                    ? 'error.recommended.approve.fail'
                    : 'error.recommended.decline.fail'
            }, iRes);
        })

    }

    viewRecommendedVideo(iReq, iRes) {
        let params = iReq['params'],
            id = params['id'];

        videoModel.findById(id)
            .then((iResult) => {
                iRes.render('admin/recommended_view', {video: iResult[0]});
            })
        .catch(() => {
            iRes.redirect('/admin/recommended');
        });
    }

    approveRecommendedVideo(iReq, iRes) {
        let params = iReq['params'],
            id     = params['id'];

        recommendedModel.approveVideo(id)
            .then(() => {
                Helpers.setNotify('success', {message: 'success.recommended.approve.successful'}, iRes);
                iRes.redirect(iReq.get('referer'));
            })
            .catch(() => {
                Helpers.setNotify('error', {message: 'error.recommended.approve.fail'}, iRes);
                iRes.redirect('/admin/recommended');
            });
    }

    declineRecommendedVideo(iReq, iRes) {
        let params = iReq['params'],
            id     = params['id'];

        recommendedModel.declineVideo(id)
            .then(() => {
                Helpers.setNotify('success', {message: 'success.recommended.decline.successful'}, iRes);
                iRes.redirect(iReq.get('referer'));
            })
            .catch(() => {
                Helpers.setNotify('error', {message: 'success.recommended.decline.successful'}, iRes);
                iRes.redirect('/admin/recommended');
            });
    }

    deletedVideoListHandler(iReq, iRes) {
        let query = iReq['query'],
            page = query['page'] || 1,
            categories = [],
            category = query['category'],
            notify = Helpers.getNotify(iReq),
            totalRecords = 0,
            skip = 0;

        Helpers.removeNotifies(iRes);

        categoryModel.getAll()
            .then(iResult => {
                categories = iResult;

                return videoModel.getByCategoryCount((category) ? new ObjectId(category) : null,
                    {'videos.addDate': -1},
                    videoModel.state.delete
                );
            })
            .then(iResult => {
                totalRecords = (iResult.length) ? iResult[0]['count'] : 0;
                skip = ( page ) ? ( page -1 ) * videoModel.limit : 0;

                return videoModel.getByCategory(
                    (category) ? new ObjectId(category) : null,
                    {'videos.addDate': -1},
                    videoModel.state.delete,
                    skip
                );
            })
            .then(iResult => {
                let  pagination = new Pagination(page, videoModel.limit, totalRecords),
                    data = {
                        categories: categories,
                        queryResult: iResult,
                        selectCategory: category,
                        notify: notify,
                        getCategoryName: Helpers.getCategoryName,
                        pagination: pagination.render('./views/admin/pagination.html', query)
                    };
                iRes.render('admin/videos_deleted', data);
            })
            .catch(()=>errorHandler.serviceUnavailable(iRes));
    }

};

module.exports = adminController;
