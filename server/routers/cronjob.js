var express = require('express');
var router = express.Router();
var db = require('../models/index');
const Promise = require('bluebird'),
    validate = require('express-validation');
const moment = require('moment');
const getdate = moment().tz('America/New_York');
let expiretimes = moment().add(12, 'months').format('YYYY-MM-DD HH:mm:ss');
var _ = require('lodash');

router.route('/update_stamp_details').get(function (req, res) {
    db.locations.findAll({
        order: 'id DESC',
        attributes: ['id', 'name'],
    }).then(function (locations) {
        if (locations.length == 0) {
            res.json({ error: true, result: locations, text: 'There is no brewery data available' });
        }
        else {
            let infoarr = _.map(locations, function (value) {
                return { location_id: value['id'] };
            });
            db.users.findAll({
                attributes: ['id', 'username'],
                include: [{
                    attributes: ['location_id'],
                    model: db.user_location_stamp
                }]
            }).then((list) => {
                if (list.length == 0) {

                    res.json({ error: true, result: infoarr, text: 'location id array' });
                }
                else {
                    var customarr = [];
                    // console.log(list);
                    list.forEach(async (client) => {
                        var stamps = [];
                        if (client.user_location_stamps.length > 0) {
                            client.user_location_stamps.forEach((u_loc_stamp) => {
                                stamps.push({ location_id: u_loc_stamp.location_id });

                            });
                            //console.log(stamps);
                            let newarr = _.differenceBy(infoarr, stamps, 'location_id');
                            //console.log(newarr);
                            if (newarr.length > 0) {
                                newarr.forEach(async (newarr) => {
                                    customarr.push({ location_id: newarr.location_id, user_id: client.id });
                                });
                            }
                        }
                        else {
                            infoarr.forEach(async (loc) => {
                                customarr.push({ location_id: loc.location_id, user_id: client.id });
                            });
                        }
                    });
                    if (customarr.length == 0) {
                        res.json({ error: false, result: customarr, text: 'No data all ok' });
                    }
                    else {
                        db.user_location_stamp.bulkCreate(customarr).then(() => {
                            res.json({ error: false, result: customarr, text: 'all record inserted succefully' });
                        }).catch((err) => {
                            res.json({ error: true, result: err, text: '' });
                        });
                    }
                }
            }).catch((err) => res.json({ error: true, result: err, text: 'Something is wrong' }));
        }
    }).catch((err) => res.json({ error: true, result: err, text: 'Something is wrong' }));
});

module.exports = router;