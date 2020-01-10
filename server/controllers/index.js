var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then(messageList => {
          res.status(200);
          res.end(JSON.stringify(messageList));
        })
        .catch(err => {
          console.log(err);
          res.status(400);
          res.end(err);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.body);
      models.messages.post(req.body)
        .then(() => {
          res.status(201);
          res.end('success');
        })
        .catch(err => {
          res.status(400);
          res.end(err);
        });
    //  a function which handles posting a message to the database
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req.body)
        .then(user => {
          res.status(200);
          res.end(user);
        })
        .catch(err => {
          res.status(400);
          res.end(err);
        });
    },
    post: function (req, res) {
      models.users.post(req.body)
        .then(() => {
          res.status(201);
          res.end('Welcome!');
        })
        .catch(err => {
          res.status(400);
          res.end(err);
        });
    }
  }
};