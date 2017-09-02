var mainController = require('./controllers/mainController');
var adminController = require('./api/controllers/adminController');
var sessionController = require('./controllers/sessionController');
var cronController = require('./api/controllers/cronController');
var routes = [];

var Routes = function (app) {
    routes.push(new sessionController(app));
    routes.push(new mainController(app));
    routes.push(new adminController(app));
    routes.push(new cronController(app));
};

exports.Routes = Routes;
