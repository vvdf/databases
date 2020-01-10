var mysql = require('mysql');
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'student', 'student');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'student',
  password : 'student',
  database : 'chat'
});
// var User = db.define('users', {
//   name: Sequelize.STRING
// });


// var Message = db.define('messages', {
//   user_id: Sequelize.INTEGER,
//   body: Sequelize.STRING,
//   room_id: Sequelize.STRING
// });
module.exports = {
  connection
};