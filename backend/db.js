const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // or your MySQL host
    user: 'root', // or your MySQL username
    password: '', // or your MySQL password
    database: 'contaxi_db', // or your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise(); // Export the promise-based pool for async/await