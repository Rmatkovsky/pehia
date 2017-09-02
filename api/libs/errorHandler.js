"use strict";

class errorHandler {
    invalidLogin(iRes) {
        return iRes.status(400)
            .json({ 'error': 'Invalid Login' });
    };

    invalidRequest(iRes) {
        return iRes.status(400)
            .json({ 'error': 'Invalid Request' });
    };

    serviceUnavailable(iRes) {
        return iRes.status(503)
            .json({ 'error': 'Service Unavailable' });
    };
};
module.exports = new errorHandler();
