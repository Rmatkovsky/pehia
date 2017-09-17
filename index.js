var mysql = require('mysql');

var connection = mysql.createConnection({ database: 'pehia', user: 'root', password: '1' });

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log(connection.query);
    console.log('connected as id ' + connection.threadId);
});