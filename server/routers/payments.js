var express = require('express');
var router = express.Router();
var db = require('../models/index');
const Promise = require('bluebird'),
    validate = require('express-validation');
const moment = require('moment');
const getdate = moment().tz('America/New_York');
let expiretimes = moment().add(12, 'months').format('YYYY-MM-DD HH:mm:ss');
var _ = require('lodash');
var stripe = require("stripe")("sk_test_11XKrMH1Wx82EuMFGEj0HNSr");

/*******************************************************************
 * PAYMENT CREATE *
 * URL:/api/payment
 *******************************************************************/
router.post('/', validate(require('../validation/payment_validation.js')), function (req, res) {
    const token = req.body.stripeToken; // Using Express    
    const user_id = req.body.user_id; // Using Express    
    const charge = stripe.charges.create({
        amount: 4500, //45$
        currency: 'usd',
        description: 'That. Beer. App. Membership',
        source: token,
    }, function (err, charge) {
        if (charge !== null) {
            console.log(charge.id);
            console.log(charge.status);
            var data = {};
            data.charge_id = charge.id;
            data.amount = 45;
            data.payment_status = charge.status;
            data.expiry_date = expiretimes;
            data.user_id = user_id;
            db.user_payment.create(data).then(user_payment => {
                if (user_payment.id != '' && charge.status == 'succeeded') {
                    db.users.findOne({
                        where: {
                            id: req.body.user_id
                        }
                    }).then(function (user) {
                        if (!user) {
                            res.json({ error: true, result: '', text: 'User does not exist.' });
                        }
                        else {
                            user.update({ subscription_type: 'Yearly', subscription_expiry_date: user_payment.expiry_date }).then((response) => {

                                var curdate = getdate;
                                var obj = {};
                                obj.id = user.id;
                                obj.email = user.email;
                                obj.name = user.username;
                                obj.dob = moment(new Date(user.dob)).format('YYYY-MM-DD');
                                obj.latitude = user.latitude;
                                obj.longitude = user.longitude;
                                obj.subscription_type = user.subscription_type;

                                if (user.subscription_expiry_date != null) {
                                    //console.log(curdate);
                                    let sub_exp_date = moment(new Date(user.subscription_expiry_date)); //TS
                                    // console.log('exp:'+sub_exp_date);
                                    if (curdate > sub_exp_date) {
                                        obj.subscription_expired = true;
                                        obj.issubscription=false;
                                    }
                                    else {
                                        obj.subscription_expired = false;
                                        obj.issubscription=true;
                                    }
                                    obj.subscription_expiry_date = moment(new Date(user.subscription_expiry_date)).format('YYYY-MM-DD');
                                }
                                else {
                                    obj.subscription_expiry_date = null;
                                    obj.subscription_expired = true;
                                    obj.issubscription=false;
                                }
                                res.json({ error: false, result: obj, text: 'Payment successfully done, Cheers!!' });
                            }).catch((err) => {
                                res.json({ error: true, result: err, text: 'Error found during updation' });
                            });
                        }
                    }).catch((err) => {
                        res.json({ error: true, result: err, text: 'user does not exist' });
                    });
                }
                else {
                    res.json({ error: true, result: [], text: 'Payment Failed,Please try again later' });
                }
            }).catch((err) => {
                res.json({ error: true, result: err, text: 'Error while updating record' });
            });
        } else if (err !== null && err.message !== null) {
            res.json({ error: true, result: null, text: err.message });
        } else {
            res.json({ error: true, result: null, text: 'Error with payment' });
        }
    });
});


module.exports = router;