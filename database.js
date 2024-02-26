// Requiring sql module
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Creating connection with sql app using host, database, user, and password
const connection = mysql.createConnection({
 host: process.env.DB_HOST,
 database: 'userdata',
 user: 'admin', 
 password: process.env.DB_PASSWORD,
});
// Connecting sql with app

connection.connect(function (err) {
 if (err) throw err;
 console.log('MySQL Database is Connected!!!!');
});

module.exports = connection;
