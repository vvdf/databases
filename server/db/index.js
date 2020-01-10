var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'student',
  password : 'student',
  database : 'chat'
});

module.exports = {
  connection
};
// // mysql input, input arguments, callback func
// connection.query('SELECT body from messages', (err, results, fields) => {
//   if (err) {
//     console.log("ERROR querying database:", err);
//   } else {
//     console.log('results:', results);
//   }
// });