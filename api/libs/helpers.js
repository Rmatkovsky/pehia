"use strict";

var moment = require('moment');
var Cookies = new (require('./cookies'))();

class Helpers {
    convertYTimeToStr(iTime){
        var convertTime = moment.duration(iTime).asSeconds();
        var mins = ~~(convertTime / 60);
        var secs = convertTime % 60;

        return `${mins} min ${secs} sec`;
    };

    getCategoryName(iCategories, iId){
         var category = iCategories.filter((item)=>{
            if( item._id == iId ){
                return item;
            }
        });

         return (category.length) ? category[0]['name'] : 'None category';
    };

    setError(iMessage, iRes) {
        Cookies.set('error', iMessage, iRes);
    };

    getError(iReq) {
        return Cookies.get('error', iReq);
    };

    setSuccess(iMessage, iRes) {
        Cookies.set('success', iMessage, iRes);
    };

    getSuccess(iReq) {
        return Cookies.get('success', iReq);
    };

    setNotify(iType, iMessage, iObj) {
        (iType == 'error') ? this.setError(iMessage, iObj) : this.setSuccess(iMessage, iObj);
    };

    getNotify(iObj) {
        let notify = {
            'error': this.getError(iObj),
            'success': this.getSuccess(iObj)
        };

        return notify;
    };

    removeNotifies(iRes){
        Cookies.remove('error', iRes);
        Cookies.remove('success', iRes);
    };
}

module.exports = new Helpers();
