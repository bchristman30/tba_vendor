var express = require('express');
var router = express.Router();
var db = require('../models/index');
var async = require("async");
const moment = require('moment');
const getdate = moment().tz('America/New_York');
const fs = require('fs');
var path = require('path');
const validate = require('express-validation');
var _ = require('lodash');
var today = getdate.format('dddd');
var sequelize = require('sequelize');

/****************************************************
 * FETCH ALL LOCATION WITH HOUR ,REVIEWS DETAILS *
 * URL:/api/location
 ****************************************************/
router.route('/').get(function (req, res) {
  db.locations.findAll({
    attributes: ['id', 'name', 'logo_string', 'address', 'city', 'state', 'zipcode', 'phone', 'website_url', 'instagram', 'description', 'created_at'],
    include: [{
      model: db.location_hours
    },
    {
      model: db.location_reviews,
      limit: 3,
      order: 'id DESC'
    },
    {
      attributes: ['id', 'location_id', 'amenity_id'],
      model: db.location_amenities,
      include: [{
        model: db.amenities
      }]
    },
    {
      limit: 5,
      attributes: ['id', 'location_id', 'beer_id'],
      model: db.location_beer,
      include: [{
        attributes: ['id', 'name', 'Alchohol_content', 'beer_description', 'beer_logo', 'price'],
        model: db.beer,
        include: [{
          attributes: ['id', 'beer_style_id', 'beer_id'],
          model: db.beer_category,
          include: [{
            attributes: ['id', 'type'],
            model: db.beer_style
          }]
        }]
      }]
    }]
  }
  ).then(function (locations) {
    if (locations.length === 0) {
      res.json({ error: true, result: locations, text: 'There are no locations in the database' });
    }
    else {
      res.json({ error: true, result: locations, text: 'Data found' });
    }
  });
});

/************************************************
 * FETCH LATEST 10 LOCATION WITH NAME, LOGO, ID *
 * URL:/api/location/latest
 ************************************************/
router.route('/latest').get(function (req, res) {
  db.locations.findAll({
    limit: 10,
    order: 'id DESC'
  }).then(function (location) {
    if (!location) {
      res.json({ error: true, result: location, text: 'There is no brewery data available' });
    }
    else {
      res.json({ error: false, result: location, text: 'data found' });
    }
  }).catch((err) => res.json({ error: true, result: err, text: 'Something is wrong' }));
});

/************************************************
 * REGISTER BREWERY *
 * URL:/api/location/create
 ************************************************/
router.route('/create').post(function (req, res) {
  var data = {};
  var base64Str = req.body.logo_string;
  let base64Image = base64Str.split(';base64,').pop();
  data.name = req.body.name;
  let filename = data.name.replace(/\s/g, "") + '.png';
  let filepath = path.join(__dirname, '../public/location/' + filename);
  data.address = req.body.address;
  data.description = req.body.description;
  data.phone = req.body.phone;
  data.website_url = req.body.website_url;
  data.instagram = req.body.instagram;
  data.city = req.body.city;
  data.state = req.body.state;
  data.zipcode = req.body.zipcode;

  fs.writeFile(filepath, base64Image, { encoding: 'base64' }, (err) => {
    if (!err) {
      console.log('File created');
      data.logo_string = '/static/uploads/' + filename;
      console.log(data);
      db.locations.create(data).then(location => {
        if (location.id != '') {
          let hours = [];
          let weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          for (let i = 0; i < 7; i++) {
            hours.push({ day: weekday[i], opening_hour: '08:00:00', closing_hour: '22:00:00', location_id: location.id });
          }
          db.location_hours.bulkCreate(hours).then(() => {
            res.json({ error: false, result: location });
          }).catch((err) => {
            res.json({ error: true, result: err });
          });
        }
      }).catch((err) => {
        res.json({ error: true, result: err });
      });
    }
    else {
      res.json({ error: true, result: [], text: err });
    }
  });
});

/**************************************************
 * ADD REVIEW IN A BREWERY[LOCATION] *
 * URL:/api/location/add_review/{location_id}
 **************************************************/
router.route('/add_review/:id').post(function (req, res) {
  var data = {};
  data.username = req.body.username;
  data.message = req.body.message;
  data.rating = req.body.rating;
  data.location_id = req.params.id;
  db.location_reviews.create(data).then(review => {
    res.json({ error: false, result: review });
  }).catch((err) => {
    res.json({ error: true, result: err });
  });
});

/**************************************************
 * ADD AMENITY TO LOCATION *
 * URL:/api/location/add_amenity
 **************************************************/

router.route('/add_amenity').post(function (req, res) {
  var data = {};
  data.location_id = req.body.location_id;
  data.amenity_id = req.body.amenity_id;
  db.location_amenities.create(data).then(loc_amenity => {
    res.json({ error: false, result: loc_amenity });
  }).catch((err) => {
    res.json({ error: true, result: err });
  });
});


/*****************************************
 * GET BREWERY DETAILS USING LOCATION_ID *
 *  * URL:/api/location/{location_id}
 *****************************************/
router.get('/:id(\\d+)', validate(require('../validation/id.js')), function (req, res) {
  //console.log(req.params);
  db.locations.findAll({
    where: { id: req.params.id },
    include: [{
      model: db.location_hours
    },
    {
      model: db.location_reviews,
      limit: 3,
      order: 'id DESC'
    },
    {
      attributes: ['id', 'location_id', 'amenity_id'],
      model: db.location_amenities,
      include: [{
        model: db.amenities
      }]
    },
    {
      limit: 5,
      attributes: ['id', 'location_id', 'beer_id'],
      model: db.location_beer,
      include: [{
        attributes: ['id', 'name', 'Alchohol_content', 'beer_description', 'beer_logo', 'price'],
        model: db.beer,
        include: [{
          attributes: ['id', 'beer_style_id', 'beer_id'],
          model: db.beer_category,
          include: [{
            attributes: ['id', 'type'],
            model: db.beer_style
          }]
        }]
      }]
    },
    // {
    //   attributes: ['id',
    //     [sequelize.fn('date_format', sequelize.col('start_date'), '%Y-%m-%d %H:%m:%s'), 'start_date'],
    //     [sequelize.fn('date_format', sequelize.col('end_date'), '%Y-%m-%d %H:%m:%s'), 'end_date'],
    //     'type',
    //     'referring_id',
    //     'location_id'
    //   ],
    //   model: db.location_calendar
    // }
  ]
  }).then((location) => {

    if (!location) {
      res.json({ error: true, result: location, text: 'There is no brewery data available of this id' });
    }
    else {
      var maindata = [];
      var x = _.find(location[0].location_hours, function (r) { if (r.day == today) { return r; } });
      if (x) {
        if (x.isclose == 0) {
          maindata.push(_.merge(location[0].dataValues, { isopentoday: true }));
        }
        else {
          maindata.push(_.merge(location[0].dataValues, { isopentoday: false }));
        }
        //location.splice(0, 0, obj);
      }
      else {
        maindata.push(_.merge(location[0].dataValues, { isopentoday: false }));
        //location.splice(0, 0, obj);
      }
      res.json({ error: false, result: maindata, text: 'brewery data available*' });
    }
  }).catch((err) => res.json({ error: true, result: err.errors[0].message }));
});

/***************************************************************************************************
 * GET LOCATION CALENDAR USING LOCATION ID [INCLUDE BOTH EVENTS AND FOODTRUCK SCHEDULE WITH DETAILS]*
 * URL:/api/location/calendar/{location_id}
 ***************************************************************************************************/
router.route('/calendar/:id').get(function (req, res) {
  var curdate = getdate.format('YYYY-MM-DD HH:mm:ss');
  var myDate = new Date(curdate);
  db.location_calendar.findAll({
    attributes: ['id',
      [sequelize.fn('date_format', sequelize.col('start_date'), '%Y-%m-%d %H:%m:%s'), 'start_date'],
      [sequelize.fn('date_format', sequelize.col('end_date'), '%Y-%m-%d %H:%m:%s'), 'end_date'],
      'type',
      'referring_id',
      'location_id'
    ],
    where: {
      location_id: req.params.id,
      // start_date: {
      //   $gt: myDate,
      // },
    },
    limit: 10
  }).then((calendar) => {
    if (calendar.length == 0) {
      res.json({ error: true, result: '', text: 'There is no brewery calendar data available' });
    }
    else {
      let i = 0;
      calendar.forEach(cal => {
        var modal = '';
        var type = '';
        if (cal.type == 'events') {
          type='event';
          modal = db.events;
        }
        else {
          type='foodtruck';
          modal = db.food_trucks;
        }
        modal.findAll({
          attributes: ['id', 'name', 'featured_image',
            [sequelize.fn('date_format', sequelize.col('created_at'), '%Y-%m-%d %H:%m:%s'), 'created_at'],
            [sequelize.fn('date_format', sequelize.col('updated_at'), '%Y-%m-%d %H:%m:%s'), 'updated_at'],
          ],
          where: { id: cal.referring_id }
        }).then((info) => {

          if (!info) {
            i++;
            console.log('referring id does not exist*');
          }
          else {
            var maindata = [];
            maindata.push(_.merge(info[0].dataValues, { type:type }));

            if (cal.type == 'events') {
              calendar.splice(i, 1, { id: cal.id, start_date: cal.start_date, end_date: cal.end_date, type: cal.type, location_id: cal.location_id, referring_id: cal.referring_id, events: maindata });
            }
            else {
              calendar.splice(i, 1, { id: cal.id, start_date: cal.start_date, end_date: cal.end_date, type: cal.type, location_id: cal.location_id, referring_id: cal.referring_id, events: maindata });
            }
            i++;
          }
          if (i == calendar.length) {
            res.json({ error: false, result: calendar, text: 'brewery calendar data available' });
          }
        }).catch((err) => {
          res.json({ error: true, result: calendar, text: 'referring id does not exist*' + err });
        });
      });

    }
  }).catch((err) => { res.json({ error: true, result: '', text: err }); });
});

router.post('/nearest', validate(require('../validation/currentlocation.js')), function (req, res) {

  let currentLat = req.body.currentLat;
  let currentLng = req.body.currentLng;
  db.locations.findAll({
    where: {
      latitude: {
        $ne: null
      },
      longitude: {
        $ne: null
      }
    }
  }).then((locations) => {
    let i = 0;
    let arr = [];
    locations.forEach(async (cal) => {
      let deslat = cal.latitude;
      let deslng = cal.longitude;
      let distanceValue = await calcCrow(currentLat, currentLng, deslat, deslng);
      i++;
      console.log(distanceValue);
      if (distanceValue <= 32187) {
        //20 miles
        arr.push({
          id: cal.id, lat: Number(cal.latitude), lng: Number(cal.longitude), icon: {
            url: cal.logo_string,
            scaledSize: {
              height: 40,
              width: 28
            }
          }
        })
      }
      if (i == locations.length) {
        res.json({ error: false, result: arr, text: 'Nearest brewery list in 20 km range' });
      }
    });
  }).catch((err) => {
    res.json({ error: true, result: [], text: err });
  });
});

/*********************************************************************************************************************************
 * THIS FUNCTION TAKES IN LATITUDE AND LONGITUDE OF TWO LOCATION AND RETURNS THE DISTANCE BETWEEN THEM AS THE CROW FLIES (IN KM) *
 *********************************************************************************************************************************/
async function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = await toRad(lat2 - lat1);
  var dLon = await toRad(lon2 - lon1);
  var lat1 = await toRad(lat1);
  var lat2 = await toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; //meter
}

/***************************************
 * CONVERTS NUMERIC DEGREES TO RADIANS *
 ***************************************/
async function toRad(Value) {
  return Value * Math.PI / 180;
}

module.exports = router;