var express = require('express');
var http = require('http');
var router = express.Router();
var restaurants = require('../models/restaurants');
var today = require('../models/today');
var request = require('request');

router.get('/', function(req, res, next) {
	res.sendfile('./views/index.html');
});

router.get('/restaurants' , function(req, res, next) {
	res.send(JSON.stringify(restaurants));
});

router.get('/restaurantids', function(req, res, next) {
	var ids = [];
	restaurants.forEach(function(restaurant) {
		ids.push(restaurant.id);
	})
	res.send(ids);
});


router.get('/restaurant/:id', function (req, res, next) {
	var id = req.params.id;
	request.get('http://www.amica.fi/modules/json/json/Index?costNumber=' + id + '&firstDay=' + today + '&lastDay=' + today +'&language=fi',
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body);
			}
		});
});

module.exports = router;