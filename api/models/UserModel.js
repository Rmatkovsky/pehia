import Base from './Base';

class UserModel extends Base {
    constructor() {
        super();
        this.db = global.db;
        this.tableName = 'users';

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

    isExistEmail(iEmail) {
        return this.select('*', `email = '${iEmail}'`);
    }
}

export default UserModel;
