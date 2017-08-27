var express = require('express');
var xAdmin = require('express-admin');
var bodyParser = require('body-parser')

var config = {
    dpath: './config/',
    config: require('./config/config.json'),
    settings: require('./config/settings.json'),
    custom: require('./config/custom.json'),
    users: require('./config/users.json')
    // additionally you can pass your own session middleware to use
};

xAdmin.init(config, function (err, admin) {
    if (err) return console.log(err);
    // web site
    var app = express();
    // mount express-admin before any other middlewares
    app.use('/admin', admin);
    // site specific middlewares
    app.use(bodyParser());
    // site routes
    app.get('/', function (req, res) {
        res.send('Hello World');
    });
    // site server
    app.listen(3000, function () {
        console.log('My awesome site listening on port 3000');
    });
});