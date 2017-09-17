import q from 'q';

class Base {
    constructor() {
        this.db = global.db;
    }

    getTableName() {
        return this.tableName;
    }

    insert(iValues) {
        const deferred = q.defer();
        const query = `INSERT INTO ${this.getTableName()} SET ?`;
        this.db.query(query, iValues, (err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    update(iValues) {
        const deferred = q.defer();
        const listValues = Object.keys(iValues).map(item => `${item}=:${item}`).join(', ');
        const query = `UPDATE ${this.getTableName()} SET ${listValues}`;
        this.db.query(query, iValues, (err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    select(iSelect, iWhere) {
        const deferred = q.defer();
        const query = `SELECT ${iSelect} FROM ${this.getTableName()} WHERE ${iWhere}`;
        this.db.query(query, (err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    delete(iWhere) {
        const deferred = q.defer();
        const query = `DELETE FROM ${this.getTableName()} WHERE ${iWhere}`;
        this.db.query(query, (err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    convertStrToUrl( iString ) {
        return iString.replace(/[^a-zA-Z0-9]+?/g, '_').replace(/_{2,}/g,'_').toLowerCase();
    }
}

export default Base;
