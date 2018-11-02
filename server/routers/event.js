var express = require('express');
var router = express.Router();
var db = require('../models/index');
var validate = require('express-validation');  //added
var sequelize = require('sequelize'); //added
var _ = require('lodash'); //lodash
var async = require("async");

/*******************************************************************
 * RETRIEVE event info BASED ON event id *
 * URL:/api/event/{event_id}
 *******************************************************************/

router.route('/:id(\\d+)').get(function (req, res) {
    db.events.findAll({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'featured_image']
    }).then((event) => {
        res.json({ error: false, result:event, text: 'data found' });

    }).catch((err) => {
        res.json({ error: true, result:[], text: err });
    });
});



//search events on a particular location using date
router.post('/location/:id(\\d+)', validate(require('../validation/is_date.js')), function (req, res) {
        var myDate = new Date(req.body.searchdate);
        console.log(`After :${myDate}`);
        db.location_calendar.findAll({
          attributes: ['id',
            [sequelize.fn('date_format', sequelize.col('start_date'), '%Y-%m-%d %H:%m:%s'), 'start_date'],
            [sequelize.fn('date_format', sequelize.col('end_date'), '%Y-%m-%d %H:%m:%s'), 'end_date'],
            'type',
            'referring_id',
            'location_id'
          ],
          where: {  
             $and:[ {location_id: req.params.id},
                sequelize.where(sequelize.fn('date', sequelize.col('start_date')), '=', myDate)
             ]}
          //limit: 10
        }).then((calendar) => {
          if (calendar.length == 0) {
            res.json({ error: true, result: '', text: 'There is no event on this date' });
          }
          else {
            let i = 0;
            calendar.forEach(cal => {
              var modal = '';
              var type = '';
              if (cal.type == 'events') {
                type = 'event';
                modal = db.events;
              }
              else {
                type = 'foodtruck';
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
                  maindata.push(_.merge(info[0].dataValues, { type: type }));
      
                  if (cal.type == 'events') {
                    calendar.splice(i, 1, { id: cal.id, start_date: cal.start_date, end_date: cal.end_date, type: cal.type, location_id: cal.location_id, referring_id: cal.referring_id, events: maindata });
                  }
                  else {
                    calendar.splice(i, 1, { id: cal.id, start_date: cal.start_date, end_date: cal.end_date, type: cal.type, location_id: cal.location_id, referring_id: cal.referring_id, events: maindata });
                  }
                  i++;
                }
                if (i == calendar.length) {
                  res.json({ error: false, result: calendar, text: 'brewery events data available' });
                }
              }).catch((err) => {
                res.json({ error: true, result: calendar, text: 'referring id does not exist*' + err });
              });
            });
          }
        }).catch((err) => { res.json({ error: true, result: '', text: err }); });
});

module.exports = router;
