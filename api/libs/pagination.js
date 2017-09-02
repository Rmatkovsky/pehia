"use strict";

let swig = require('swig');

class Pagination {
    constructor(currentPage, perPage, totalItems) {
        this.options = {};
        this.options.currentPage = currentPage || 1;
        this.options.perPage = perPage || 5;
        this.options.totalItems = totalItems || 0;
        this.options.maxRange =  (totalItems) ? Math.ceil( totalItems / perPage ) : 1 ;
        this.options.forRange = new Array( this.options.maxRange );
    }

    render( pathToTmpl, iUrlParams ) {
        this.options.urlParams = iUrlParams;
        return swig.renderFile(pathToTmpl, this.options);
    }
}

module.exports = Pagination;
