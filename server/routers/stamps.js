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
const verifytoken = require('../middleware/verifytoken.js');


/************************************************
* Redeem stamp *
* URL:/api/stamp
* validate(require('../validation/redeem_stamp.js'))
************************************************/
router.post('/redeem', [verifytoken, validate(require('../validation/redeem_stamp.js'))], function (req, res) {

    db.user_location_stamp.find({
        where: {
            user_id: req.body.user_id,
            location_id: req.body.location_id
        }
    }).then((user_location_stamp) => {
        if (!user_location_stamp) {
            res.json({ error: true, result: '', text: 'There is no record found' });
        }
        else if (user_location_stamp.stamp == false) {
            user_location_stamp.update({ stamp: true }).then((response) => {
                db.locations.find({
                    where: {
                        id: req.body.location_id
                    }
                }).then((locationinfo) => {
                    if (!locationinfo) {
                        res.json({ error: true, result: '', text: 'There is no brewery data available' });
                    }
                    else {
                        let total = locationinfo.total_redeemed_stamp + 1;
                        locationinfo.update({ total_redeemed_stamp: total }).then((resp) => {
                            res.json({ error: false, result: '', text: 'Stamp redeemed successfully!!' });
                        }).catch((err) => {
                            res.json({ error: true, result: err, text: 'Error found during updation*' });
                        });
                    }
                }).catch((err1) => res.json({ error: true, result: err1, text: 'Something is wrong' }));
            }).catch((err) => {
                res.json({ error: true, result: err, text: 'Error found during updation' });
            });
        }
        else {
            res.json({ error: true, result: '', text: 'Stamp already redeem from this brewery!!' });
        }
    }).catch((err) => {
        res.json({ error: true, result: err, text: 'Something is wrong*!!' });
    });
});


module.exports = router;