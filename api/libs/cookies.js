"use strict";

class Cookies {
    constructor() {    }

    set(iName, iValue, iRes) {
        iRes.cookie(iName, iValue, {maxAge: 10000000, httpOnly: true, signed: true});
    }

    get(iName, iReq) {
        let cookies = iReq['signedCookies'];
        
        return cookies[iName];
    }

    remove(iName, iRes) {
        iRes.clearCookie(iName);
    }
}

module.exports = Cookies;
