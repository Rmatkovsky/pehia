import apiConfig from '../../config/apiConfig';
import ApiClient from './ApiClient';

import UserAPI from '../UserAPI';

function apiFactory({ baseURL }) {
    const api = new ApiClient({ baseURL });

    return {
        user: new UserAPI({ apiClient: api }),
    };
}

export default apiFactory({
    baseURL: apiConfig.apiUrl,
});
