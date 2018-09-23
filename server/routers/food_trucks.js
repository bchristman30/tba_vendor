var express = require('express');
var router = express.Router();
var db = require('../models/index');
const moment = require('moment');
const getdate = moment().tz('America/New_York');

/****************************************************
 * ADD FOOD TRUCK DETAILS *
 * URL:/api/foodtruck/add
 ****************************************************/
router.route('/add').post(function (req, res) {
  var data = {};
  data.featured_image = req.body.featured_image;
  data.description = req.body.description;
  data.address = req.body.address;
  data.city = req.body.city;
  data.state = req.body.state;
  data.zipcode = req.body.zipcode;
  data.phone = req.body.phone;
  data.name = req.body.name;
  db.food_trucks.create(data).then(fd => {

    res.json({ error: false, result: fd });
    /*let hours = [];
    let weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (let i = 0; i < 7; i++) {
      hours.push({ day: weekday[i], opening_hour: '09:00:00', closing_hour: '20:00:00', food_truck_id: fd.id });
    }
    db.food_truck_hours.bulkCreate(hours).then(() => {
      res.json({ error: false, result: fd });
    }).catch((err) => {
      res.json({ error: true, result: err });
    });*/

  }).catch((err) => {
    res.json({ error: true, result: err });
  });
});

/**************************************************
 * ADD REVIEW IN A BREWERY[LOCATION] *
 * URL:/api/foodtruck/add_review/{location_id}
 **************************************************/
router.route('/add_review/:id').post(function (req, res) {
  var data = {};
  data.username = req.body.username;
  data.message = req.body.message;
  data.rating = req.body.rating;
  data.food_truck_id = req.params.id;
  db.food_trucks_reviews.findAndCountAll({
    where: { food_truck_id: req.params.id, username: req.body.username },
  }).then((reviewdata) => {

    if (reviewdata.count == 0) {
      db.food_trucks_reviews.create(data).then(review => {
        res.json({ error: false, result: review, text: 'added' });
      }).catch((err) => {
        res.json({ error: true, result: [], text: err });
      });
    }
    else {
      res.json({ error: false, result: [], text: 'You have already given review' });
    }
  }).catch((err) => {
    res.json({ error: true, result:[], text: err });
  });
});

/**********************************************
 * GET FOOD TRUCK DETAILS USING FOOD_TRUCK_ID *
 * URL:/api/foodtruck/{food_truck_id}
 **********************************************/
router.route('/:id').get(function (req, res) {
  db.food_trucks.findAll({
    where: { id: req.params.id },
    include: [{
      limit: 5,
      model: db.food_trucks_menu,
      include: [{
        model: db.food_trucks_menu_category
      }]
    },
    {
      limit: 3,
      order: 'id DESC',
      model: db.food_trucks_reviews
    }
    ]
  }).then((foodtruck) => {
    res.json({ error: false, result: foodtruck, text: 'data found' });

  }).catch((err) => {
    res.json({ error: true, result:[], text: err });
  });
});

/***************************
 * FOOD TRUCK SCHEDULE ADD *
 ***************************/
router.route('/add_calendar/:id').post(function (req, res) {
  var data = {};
  data.start_date = req.body.startdate;
  data.type = 'food_trucks';
  data.end_date = req.body.end_date;
  data.location_id = req.body.location_id;
  data.referring_id = req.params.id;
  db.location_calendar.findAndCountAll({
    where: { referring_id: req.params.id, type: 'food_trucks', start_date: data.start_date },
  }).then((calendar) => {

    if (calendar.count == 0) {
      db.location_calendar.create(data).then(cal => {
        res.json({ error: false, result: cal, text: 'added' });
      }).catch((err) => {
        res.json({ error: true, result: '', text: err });
      });
    }
    else {
      res.json({ error: false, result: '', text: 'You have already scheduled for this date&time' });
    }
  }).catch((err) => {
    res.json({ error: true, result:[], text: err });
  });
});

/***********************************************
 * GET FOOD TRUCK CALENDAR USING FOOD_TRUCK_ID *
 * URL:/api/foodtruck/calendar/{food_truck_id}
 ***********************************************/
router.route('/calendar/:id').get(function (req, res) {
  var curdate = getdate.format('YYYY-MM-DD HH:mm:ss');
  var myDate = new Date(curdate);
  db.location_calendar.findAll({
    where: {
      referring_id: req.params.id,
      type: 'food_trucks',
      start_date: {
        $gt: myDate,
      }
    },
    include: [{
      model: db.locations
    }]
  }).then((calendar) => {
    res.json({ error: false, result: calendar, text: 'data found' });

  }).catch((err) => {
    res.json({ error: true, result:[], text: err });
  });
});



module.exports = router;