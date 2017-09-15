import Cookies from './cookies';

class Helpers {
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
            error: this.getError(iObj),
            success: this.getSuccess(iObj),
        };

        return notify;
    };

    removeNotifies(iRes){
        Cookies.remove('error', iRes);
        Cookies.remove('success', iRes);
    };
}

export default Helpers;
