import bcrypt from 'bcryptjs';
import config from '../../config/app.config';
import Base from './Base';

import userMapper from '../mappers/user.mapper';

class UserModel extends Base {
    constructor(db) {
        super(db);
        this.tableName = 'users';
        this.config = config[process.env.BUILD_ENV];

        this.validateValues = {
            name: {
                min: 2,
                max: 45,
            },
            last_name: {
                min: 2,
                max: 45,
            },
            password: {
                min: 6,
                max: 20,
            },
        };
    }

    login(email, password) {
        const hashPassword = bcrypt.hashSync(password, this.config.salt);
        return this.select('*', `email = '${email}' AND password = '${hashPassword}' AND status = '1'`);
    }

    isExistGoogle(userId) {
        return this.select('*', `google = '${userId}'`);
    }

    isExistEmail(email) {
        const select = 'id, name, last_name, email, type_of_plans_id, user_types_id, info, location, phone';
        return this.select(select, `email = '${email}'`);
    }

    addUserByFacebook(data) {
        const nData = userMapper.req.userByFacebook(data);
        return this.insert(nData);
    }

    activate(activityCode) {
        return this.update({ status: 1 }, `activity_code = '${activityCode}' AND status = 0`);
    }

    getInfo(id) {
        const select = 'id, name, last_name, email, type_of_plans_id, user_types_id, info, location, phone';
        return this.select(select, `id = ${id} and status = 1`);
    }
}

export default UserModel;
