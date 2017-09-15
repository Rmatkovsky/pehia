import mysql from 'mysql';

class userModel {
    constructor() {
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

    isExistEmail(iEmail) {
        mysql
    }
}