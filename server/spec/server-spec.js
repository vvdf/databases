/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function () {
  var dbConnection;

  beforeEach(function (done) {
    dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'chat'
    });
    dbConnection.connect();

    var tablenames = ['messages', 'users', 'rooms']; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    tablenames.forEach((tablename, index) =>
      dbConnection.query('truncate ' + tablename, () => {
        if (index === tablenames.length - 1) {
          done();
        }
      })
    );
  });

  afterEach(function () {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function (done) {
    request({
      method: 'POST',
      url: 'http://127.0.0.1:3000/classes/users',
      json: {
        username: 'Valjean'
      }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        url: 'http://127.0.0.1:3000/classes/messages',
        json: {
          user_id: 29034,
          body: 'In mercy\'s name, three days is all I need.',
          room_id: 777
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function (err, results) {
          // Should have one result:
          console.log(results);
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].body).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function (done) {
    // Let's insert a message into the db
    var queryString = `INSERT INTO messages (body, user_id, room_id)
    values ('fun message', 098, 234)`;
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function (err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].body).to.equal('fun message');
        expect(messageLog[0].room_id).to.equal(234);
        done();
      });
    });
  });
});
