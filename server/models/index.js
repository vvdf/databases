var db = require('../db');
var Promises = require('bluebird');
var currentTime = () => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

module.exports = {
  messages: {
    get: function () {
      return new Promise ((resolve, reject) => {
        db.connection.query('SELECT * FROM messages', (err, result) => {
          if (err) {
            console.log('ERROR, models.messages.get:', err);
            reject(err);
          } else {
            console.log('SUCCESS, models.messages.get:', result);
            resolve(result);
          }
        });
      });
    }, // a function which produces(makes a mysql query) all the messages( all records in the messages entity)
    post: function (data) {
      return new Promise ((resolve, reject) => {
        db.connection.query(
          `INSERT INTO
          messages
          (body, time_created, user_id, room_id)
          value (${data.text},${currentTime()},${data.user_id},${data.room_id}) `,
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve("Successful Message Post");
            }
          });
      });
    } // a function which can be used to insert(mysql query) a message(req data) into the database
  },

  users: {
    // Ditto as above.
    get: function (data) {
      return new Promise ((resolve, reject) => {
        db.connection.query(`SELECT * FROM users WHERE name = ${data.username}`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
    post: function () {}
  }
};

