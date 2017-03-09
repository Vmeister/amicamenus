var http = require('http');
var express = require('express');
var angular = require('min-angular');
var path = require('path');
var fs = require('fs');
var restaurants = require('./models/restaurants');

var router = require('./routes/routes');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

const PORT=8080;

app.listen(PORT, () => {
	console.log('App listening on port %s', PORT);
});

module.exports = app;