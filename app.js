import express from 'express';
import fallback from 'express-history-api-fallback';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import xAdmin from 'express-admin';
import mysql from 'mysql';
import Routes from './api/routes';

import localConfig from './config/local.conf';

const db = mysql.createConnection(localConfig.mysql);
const port = process.env.PORT || 3000;
const config = {
    dpath: './config/',
    config: localConfig,
    settings: require('./config/settings.json'),
    custom: require('./config/custom.json'),
    users: require('./config/users.json'),
};

xAdmin.init(config, (err, admin) => {
    if (err) {
        return console.log(err);
    }

    return db.connect((dbErr) => {
        if (dbErr) {
            return console.log(err);
        }
        global.db = db;
        const app = express();

        app.use(helmet());
        app.use(urlencoded({ extended: true }));
        app.use(json());
        app.use(cookieParser(config.salt));

        // mount express-admin before any other middlewares
        app.use('/admin', admin);
        app.use('/api', Routes);

        app.use(express.static(`${process.cwd()}/public`));
        app.use(fallback('index.html', { root: `${process.cwd()}/public` }));

        app.use((iReq, iRes) => {
            iRes.redirect('/404');
        });


        return app.listen(port, () => console.log(`Server start. Port: ${port}`));
    });
});
