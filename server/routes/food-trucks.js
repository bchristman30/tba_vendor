var express = require('express');
var router = express.Router();
var pool = require('../db');

// Get All Food Trucks
router.get('/', function(req, res, next) {	
	pool.getConnection(function(err, connection) {
		// Use the connection
		connection.query("select * from food_trucks", function (err2, result) {
		  // And done with the connection.
		  connection.release();
		  res.send(result);
		  
		  // Handle error after the release.
		  if (err2) throw err2;
		  // Don't use the connection here, it has been returned to the pool.
		});
	});
});

// Get single Food Trucks
router.get('/:id', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query("select * from food_trucks where ft_id = ?",[req.params.id], function (err2, foodTruckResult) {
            connection.release();
            res.send(foodTruckResult[0]);
		    if (err2) throw err2;
		});
	});
});

// Save Food Truck
// we get to angular application
router.post('/', function(req, res, next) {
});

// Delete Food Truck
router.delete('/:id', function(req, res, next) {
});

// Update Food Truck
// put req === updating info already on server
router.put('/:id', function(req, res, next) {
});

module.exports = router;