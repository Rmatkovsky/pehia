import bcrypt from 'bcryptjs';
import config from '../../config/app.config';
import Base from './Base';

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

        this.isExistEmail = this.isExistEmail.bind(this);
    }

    login(email, password) {
        const hashPassword = bcrypt.hashSync(password, this.config.salt);
        return this.select('*', `email = '${email}' AND password = '${hashPassword}'`);
    }

    isExistEmail(email) {
        return this.select('*', `email = '${email}'`);
    }
}

export default UserModel;
