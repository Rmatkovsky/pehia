var mysql = require('mysql');

var connection = mysql.createConnection({ database: 'pehia', user: 'root', password: '1' });

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    connection.query(`SELECT * FROM users WHERE email = 'matkovsky.ruslan@gmail.cm'`, function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results,error);
    });
    console.log('connected as id ' + connection.threadId);
});