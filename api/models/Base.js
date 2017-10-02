import q from 'q';

class Base {
    constructor(db) {
        this.db = db;
        // db.config.queryFormat = (query, values) => {
        //     if (!values) return query;
        //     return query.replace(/\:(\w+)/g, (txt, key) => {
        //         if (values.hasOwnProperty(key)) {
        //             return this.escape(values[key]);
        //         }
        //         return txt;
        //     });
        // };
    }

    getTableName() {
        return this.tableName;
    }

    insert(values) {
        const deferred = q.defer();
        const query = `INSERT INTO ${this.getTableName()} SET ?`;
        this.db.query(query, values, (err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    update(values, where) {
        const deferred = q.defer();
        const query = `UPDATE ${this.getTableName()} SET ? WHERE ${where}`;
        this.db.query(query, values, (err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    select(select, where) {
        const deferred = q.defer();
        const query = `SELECT ${select} FROM ${this.getTableName()} WHERE ${where}`;
        this.db.query(query, (err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    delete(where) {
        const deferred = q.defer();
        const query = `DELETE FROM ${this.getTableName()} WHERE ${where}`;
        this.db.query(query, (err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }
}

export default Base;
