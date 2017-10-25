import bcrypt from 'bcryptjs';
import _each from 'lodash/each';

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
            password: {
                min: 6,
                max: 20,
            },
        };
    }

    login(email, password) {
        const hashPassword = bcrypt.hashSync(password, config.salt);
        return this.select('*', `email = '${email}' AND password = '${hashPassword}' AND status = '1'`);
    }

    isExistGoogle(userId) {
        return this.select('*', `google = '${userId}'`);
    }

    isExistEmail(email) {
        const select = 'id, name, email, type_of_plans_id, user_types_id, info, location, phone';
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
        const select = 'id, avatar, name, email, type_of_plans_id, user_types_id, info, location, phone';
        return this.select(select, `id = ${id} and status = 1`);
    }

    updateInfo(id, values) {
        const allowFields = [
            'name',
            'email',
            'phone',
            'info',
            'location',
            'avatar',
        ];
        const updateData = {};
        _each(values, (val, key) => {
            if (allowFields.indexOf(key) !== -1) {
                updateData[key] = val;
            }
        });
        const where = `id = ${id}`;
        return this.update(updateData, where);
    }

    addPhoto(userId, photoId) {

    }
}

export default UserModel;
