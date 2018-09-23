var express = require('express');
var router = express.Router();
var locationController = require('../controllers/locationController');
var db = require('../models/index');
var async = require("async");


router.route('/add').post(function (req, res) {
  var data = {};
  data.name = req.body.name;
  data.help_text = req.body.help_text;
  data.icon = req.body.icon;
  db.amenities.create(data).then(review => {
    res.json({ error: false, result: review });
  }).catch((err) => {
    res.json({ error: true, result: err.errors[0].message });
  });
});



module.exports = router;