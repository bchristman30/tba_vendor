var express = require('express');
var router = express.Router();
var db = require('../models/index');
const moment = require('moment');
const getdate = moment().tz('America/New_York');
var sequelize = require('sequelize');
var multer = require('multer');
var upload = multer({ dest: '../public/event/' }).single('logo');
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'thatbeerapp',
  api_key: '416442547859432',
  api_secret: 'UF9i1FPy69toaWA5AWvZcVccnUw'
});

/****************************************************
 * List of Food Truck *
 * URL:/api/foodtruck/list
 ****************************************************/
router.route('/list').get(function (req, res) {
  db.food_trucks.findAll({
    attributes:['id','name','featured_image','featured_image_id'] 
    }).then((foodtruck) => {
    res.json({ error: false, result: foodtruck, text: 'data found' });

  }).catch((err) => {
    res.json({ error: true, result: [], text: err });
  });
});

/******************************************************
* check brewery name availability *
* URL:/api/foodtruck/is_name_available
******************************************************/
router.post('/is_name_available', function (req, res) {
  db.food_trucks.findAll({
    where: ["name like ?", '%' + req.body.name + '%']
  }).then(function (fd) {
    if (fd.length == 0) {
      res.json({ error: false, result: true, text: 'Food Truck Name available' });
    }
    else {
      res.json({ error: false, result: false, text: 'Food Truck name already exist,try another' });
    }
  }).catch((err) => {
    res.json({ error: true, result: err, text: 'Something is wrong!!' });
  });

});

/****************************************************
 * CREATE NEW FOOD TRUCK AND ADD IT TO BREWERY *
 * URL:/api/foodtruck/location
 ****************************************************/
router.post('/location', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.json({ error: true, result: '', text: 'Unable to upload image file.' });
    };
    console.log(req.body);
     cloudinary.v2.uploader.upload(req.file.path, {
      folder: "events/foodtrucks"
    },
      function (error, result) {
        console.log(result, error);
        if (!error) {
          let data = {
            name: req.body.name,
            featured_image: result.secure_url,
            featured_image_id: result.public_id,
            description: req.body.description,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            phone: req.body.phone
          };
          console.log(data);
          db.food_trucks.create(data).then(ft => {
            if (ft.id != '') {
              var up = {
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                type: 'food_trucks',
                referring_id: ft.id,
                location_id: req.body.location_id
              };
              console.log(up);  
              db.location_calendar.create(up).then(location_calendar => {
                if (location_calendar.id != '') {
                  res.json({ error: false, result: '', text: 'food truck created and schedule successfully' });

                }
              }).catch((err) => {
                res.json({ error: true, result: err, text: 'unable to schedule foodtruck in brewery with brewery' });
              });
            }
          }).catch((nerr) => {
            res.json({ error: true, result: nerr, text: 'unable to create food truck' });
          });
        }
        else {
          res.json({ error: true, result: error, text: 'Error found during uplodation' });
        }
      }); 
  }); 
});

/****************************************************
 * ADD EXISTING FOOD TRUCK TO BREWERY *
 * URL:/api/foodtruck/location/{location_id}
 ****************************************************/
router.post('/location/:id(\\d+)', function (req, res) {
      var up = {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        type: 'food_trucks',
        referring_id: req.body.food_truck_id,
        location_id: req.params.id
      };
       console.log(up);
      db.location_calendar.create(up).then(location_calendar => {
        if (location_calendar.id != '') {
          res.json({ error: false, result: '', text: 'food truck scheduled and linked to brewery successfully' });

        }
      }).catch((err) => {
        res.json({ error: true, result: err, text: 'unable to schedule foodtruck in brewery with brewery' });
      });
});

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
router.route('/add_review/:id(\\d+)').post(function (req, res) {
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
    res.json({ error: true, result: [], text: err });
  });
});

/**********************************************
 * GET FOOD TRUCK DETAILS USING FOOD_TRUCK_ID *
 * URL:/api/foodtruck/{food_truck_id}
 **********************************************/
router.route('/:id(\\d+)').get(function (req, res) {
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
    res.json({ error: true, result: [], text: err });
  });
});

/***************************
 * FOOD TRUCK SCHEDULE ADD *
 ***************************/
router.route('/add_calendar/:id(\\d+)').post(function (req, res) {
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
    res.json({ error: true, result: [], text: err });
  });
});

/***********************************************
 * GET FOOD TRUCK CALENDAR USING FOOD_TRUCK_ID *
 * URL:/api/foodtruck/calendar/{food_truck_id}
 ***********************************************/
router.route('/calendar/:id(\\d+)').get(function (req, res) {
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
    res.json({ error: true, result: [], text: err });
  });
});

router.route('/popular').get(function (req, res) {
  db.food_trucks_reviews.findAll({
    attributes: ['food_truck_id', [sequelize.fn('AVG', sequelize.col('food_trucks_reviews.rating')), 'avg_rating']],
    group: 'food_truck_id',
    limit: 8,
    order: [[sequelize.fn('AVG', sequelize.col('food_trucks_reviews.rating')), 'DESC']],
    include: [{
      model: db.food_trucks
    }]
  }).then((foodtrucks) => {
    if (!foodtrucks) {
      res.json({ error: false, result: foodtrucks, text: 'No data found' });
    }
    else {
      res.json({ error: false, result: foodtrucks, text: 'data found' });
    }

  }).catch((err) => {
    res.json({ error: true, result: [], text: err });
  });
});

module.exports = router;