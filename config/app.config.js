import path from 'path';
import socials from './socials.config';

const rootPath = path.resolve(__dirname, '../');

export default {
    aws: {
        mysql: {
            database: 'pehia',
            host: 'aa1j91uv0snptyr.cyqbj44juwmx.us-east-2.rds.amazonaws.com',
            user: 'pehia',
            password: 'c0Cain3123',
            port: process.env.RDS_PORT,
        },
        server: {
            port: 3000,
        },
        app: {
            layouts: true,
            themes: true,
            languages: true,
            root: '/admin',
            upload: `${rootPath}/upload/images/`,
        },
    },
    local: {
        mysql: {
            database: 'pehia',
            user: 'root',
            password: '1',
        },
        server: {
            port: 3000,
        },
        app: {
            layouts: true,
            themes: true,
            languages: true,
            root: '/admin',
            upload: `${rootPath}/upload/images/`,
        },
    },
    socials,
    salt: '$2a$10$4J1JJRDzHpWSQzxvvfZH/O',

};
