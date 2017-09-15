class Cookies {
    set(iName, iValue, iRes) {
        iRes.cookie(iName, iValue, {maxAge: 10000000, httpOnly: true, signed: true});
    }

    get(iName, iReq) {
        const cookies = iReq.signedCookies;
        return cookies[iName];
    }

    remove(iName, iRes) {
        iRes.clearCookie(iName);
    }
}

export default Cookies;
