var express = require('express');

var app = express(); 
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:ewd16@ds035975.mlab.com:35975/customers_db');

require('./config/express').addMiddleware(app)
require('./routes')(app)

app.listen(4000, function() {
  console.log('Express server listening.');
});