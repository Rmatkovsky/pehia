import q from 'q';
import { Facebook } from 'fb';

import config from '../../config/app.config';

class FacebookModel {
    constructor() {
        this.fb =
            new Facebook({ appId: config.socials.facebook.appId, appSecret: config.socials.facebook.appSecret });
    }

    getUserInfo(token) {
        const deferred = q.defer();
        this.fb.setAccessToken(token);
        this.fb.api('me', { fields: 'id, first_name, last_name, email, picture.type(large)' }, (res) => {
            if (!res || res.error) {
                deferred.reject(res.error || { error: 'Bad request' });
            }

            deferred.resolve(res);
        });
        return deferred.promise;
    }
}

export default FacebookModel;
