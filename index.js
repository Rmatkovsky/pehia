var mysql = require('mysql');

var connection = mysql.createConnection({ database: 'pehia', user: 'root', password: '1' });

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    var values = { name: 'Ruslan',
        last_name: 'Matkovsky',
        email: 'neti@i.ua',
        facebook: '1228090618' };
    connection.query(`INSERT INTO users SET ?`, values, function (error, results) {
        console.log('The error is: ', error);
        if (error) throw error;
        console.log('The solution is: ', results, error);
    });
    console.log('connected as id ' + connection.threadId);
});