// // var pool = require('../db');

// var db = require('../models/index');
// // Display list of all books.
// exports.location_list = function(req, res) {
//     console.log("hello");
    
//     pool.getConnection(function(err, connection) {
// 		// Use the connection
// 		connection.query("select * from location", function (err2, result) {    
// 		  connection.release();
// 		  res.send(result);
// 		  if (err2) throw err2;
// 		});
// 	});
// };

// exports.location_id = function(req, res) {
//     pool.getConnection(function(err, connection) {
// 		connection.query("select * from location where id = ?",[req.params.id], function (err2, locationResult) {
// 			connection.query("select * from location_hours where location_id = ?", [req.params.id], function (err, hoursResult) {
// 				connection.query(getLocationPerkSQL(), [req.params.id], function (err3, perkResult) {
// 						connection.query(getLocationFoodTruckSQL(),[req.params.id], function (err4, foodTruckResult) {
// 							connection.release();
// 							locationResult[0].hours = hoursResult;
// 							locationResult[0].perks = perkResult;
// 							locationResult[0].foodTrucks = foodTruckResult;
// 							res.send(locationResult[0]);
// 						  if (err2) throw err2;
// 						});
// 					if (err3) throw err3;
// 				});
// 			if (err) throw err;
// 			});
// 		if (err2) throw err2;
// 		});
// 	});
// };

// function getLocationFoodTruckSQL() {
// 	var sql = "select  lft.ft_id, event_start, event_end, name, featured_image from location_food_trucks lft "
// 			+ "left join food_trucks ft on ft.ft_id=lft.ft_id "
// 			+ " where lft.l_id=?";
// 	return sql;
// }

// function getLocationPerkSQL() {
// 	var sql = "select perk_icon_name as perkIconName from perks as p " 
// 				+ "left join location_perks as lp on lp.perk_id=p.p_id "
// 				+ "where lp.location_id=?;";
// 	return sql;
// }