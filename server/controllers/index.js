var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then(messageList => {
          console.log(JSON.stringify(messageList));
          res.status(200);
          res.end(JSON.stringify(messageList));
        })
        .catch(err => console.log(err));
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.data)
        .then(() => {
          res.status(201);
          res.end('success');
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req.data)
        .then(user => {
          res.status(200);
          res.end(user);
        });
    },
    post: function (req, res) {
      models.users.post()
        .then(() => {
          res.status(201);
          res.end('Welcome!');
        });
    }
  }
};