var mongoose = require('mongoose');
var dbConnection = 'mongodb://localhost:27017/yathzeedb'

mongoose.connect(dbConnection);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbConnection);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

require('./users');
require('./game');