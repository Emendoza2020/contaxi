const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contaxi_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('✅ Conectado a MySQL');
});

module.exports = connection;