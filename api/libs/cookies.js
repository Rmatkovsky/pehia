class Cookies {
    static set(name, value, res) {
        res.cookie(name, value, { maxAge: 10000000, httpOnly: true, signed: true });
    }

    static get(name, req) {
        const cookies = req.signedCookies;
        return cookies[name];
    }

    static remove(name, res) {
        res.clearCookie(name);
    }
}

export default Cookies;
