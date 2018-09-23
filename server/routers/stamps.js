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

    db.user_location_stamp.findOne({
        where: {
            user_id: req.body.user_id,
            location_id: req.body.location_id
        }
    }).then(function (user_location_stamp) {
        if (!user_location_stamp) {
            res.json({ error: true, result: '', text: 'There is no record found' });
        }
        else if (user_location_stamp.stamp == false) {
            user_location_stamp.update({ stamp: true }).then((response) => {
                var data = {};
                data.user_id = req.body.user_id;
                data.location_id = req.body.location_id;
                data.stamp = true;
                db.user_stamps_entries.create(data).then(stamp_entry => {
                    if (stamp_entry.id != '') {
                        res.json({ error: false, result: '', text: 'Stamp redeemed successfully!!' });
                    }
                }).catch((err) => {
                    res.json({ error: true, result: err, text: 'Something is wrong' });
                });
            }).catch((err) => {
                res.json({ error: true, result: err, text: 'Error found during updation' });
            });
        }
        else {
            res.json({ error: true, result: '', text: 'Stamp already redeem from this brewery!!' });
        }
    }).catch((err) => {
        res.json({ error: true, result: err, text: 'Something is wrong!!' });
    });
});



module.exports = router;