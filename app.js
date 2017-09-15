import express from 'express';
import fallback from 'express-history-api-fallback';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import xAdmin from 'express-admin';
import Routes from './api/routes';

const port = process.env.PORT || 3000;
const config = {
    dpath: './config/',
    config: require('./config/aws.conf'),
    settings: require('./config/settings.json'),
    custom: require('./config/custom.json'),
    users: require('./config/users.json'),
};

xAdmin.init(config, (err, admin) => {
    if (err) {
        return console.log(err);
    }

    const app = express();

    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser(config.salt));

    // mount express-admin before any other middlewares
    app.use('/admin', admin);
    // site specific middlewares
    app.use(bodyParser());
    app.use('/api', Routes);

    app.use(express.static(`${process.cwd()}/public`));
    app.use(fallback('index.html', { root: `${process.cwd()}/public` }));

    app.use((iReq, iRes) => {
        iRes.redirect('/404');
    });


    return app.listen(port, () => console.log(`Server start. Port: ${port}`));
});
