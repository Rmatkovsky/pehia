import Base from './config/Base';

import ep from '../constants/endPoints.constant';
import normalizr from '../utils/mappers/user.mapper';

class UserAPI extends Base {

    createUser(params) {
        const url = ep.auth.signin();
        return this.apiClient.post(url, params);
    }

    loginedUser(params) {
        const url = ep.auth.login();
        return this.apiClient.post(url, params);
    }

    getUser() {
        const url = ep.profile.me();
        return this.apiClient.get(url);
    }

    recoveryPassword(params) {
        const url = ep.auth.recovery();
        return this.apiClient.post(url, params);
    }

    resetPassword(params) {
        const url = ep.profile.resetPassword();
        return this.apiClient.put(url, params);
    }

    updateUser(params) {
        const url = ep.profile.update();
        const paramsUser = normalizr.req.updateUser(params);

        return this.apiClient.put(url, paramsUser);
    }

    isExistsName(params) {
        const url = ep.user.uniqueName();
        return this.apiClient.get(url, params);
    }

    isExistsEmail(params) {
        const url = ep.user.uniqueEmail();
        return this.apiClient.get(url, params);
    }

    userLogout() {
        const url = ep.auth.logout();
        return this.apiClient.delete(url);
    }
}

export default UserAPI;
