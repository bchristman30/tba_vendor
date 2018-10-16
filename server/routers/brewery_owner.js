var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');
var md5 = require('md5');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const moment = require('moment');
const getdate = moment().tz('America/New_York');
const EmailTemplate = require('email-templates-v2').EmailTemplate;
const path = require('path');
const Promise = require('bluebird'),
    validate = require('express-validation');
const RSA_PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../secure/private.key"));
const verifytoken = require('../middleware/verifytoken.js');
const _ = require('lodash');
const sendEmail = require('../../config/config_email');

/********************************************************************************
 * REGISTER USER *
 *******************************************************************************/
router.route('/register').post(function (req, res) {
    let host;
    if (req.body) {
        if (req.secure == true) {
            host = 'https://' + req.headers.host;
        }
        else {
            host = 'http://' + req.headers.host;
        }
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            req.body.password = hash;
            req.body.confirmation_key = md5(req.body.email);
            db.brewery_owners.create(req.body).then(response => {
                db.locations.update(
                    {
                        brewery_owner_id: response.id,
                        name: 'Best Calf Brewery'
                    }, {
                        where: { id: req.body.location_id },
                        returning: true,
                        plain: true
                    }).then((result) => {
                        let users = [{
                            name: 'Brewery Owner',
                            id: response.id,
                            key: req.body.confirmation_key,
                            email: response.email,
                            type: 0,
                            host: host
                        }];
                        sendmailtoUser('Confirmation', users);
                        res.json({ error: false, result: { isverify: response.isverify, id: response.id, email: response.email }, text: 'Your account has been created successfully,cheers!! ', updata: result });
                    }).catch((err) => {
                        res.json({ error: true, result: '', text: err.errors[0].message });
                    });

            }).catch((err) => {
                res.json({ error: true, result: '', text: err.errors[0].message });
            });
        });
    }
    else {
        res.json({ error: true, result: '', text: 'parameter not found' });
    }
});

router.post('/login', validate(require('../validation/login.js')), function (req, res) {
    db.brewery_owners.findOne({
        where: {
            email: req.body.email
        },
        attributes: ['id', 'email', 'phone','password','isverify'],
        include: [
        {
          attributes: ['id', 'brewery_owner_id','name'],
          model: db.locations
        }]
    }).then(function (user) {
        if (user == null) {
            res.json({ error: true, result: '', text: 'Invalid Email and password' });
        }
        else if (user.isverify == 1) {
            bcrypt.compare(req.body.password, user.password, function (err, response) {
                if (err) {
                    res.json({ error: true, result: err, text: 'errr' });
                }
                else if (response) {
                    let expiretimestamp = moment().add(30, 'days').unix();
                    const token = jwt.sign({ id: user.id, }, RSA_PRIVATE_KEY, {
                        algorithm: 'RS256',
                        expiresIn: expiretimestamp,    // 30 days validity
                    });
                    var obj = {};
                    obj.id = user.id;
                    obj.email = user.email;
                    obj.phone = user.phone;
                    obj.location=user.location;
                    res.json({ error: false, result: obj, idToken: token, expiresIn: expiretimestamp, text: 'Welcome ' + user.email + ',your are successfully logged in!!' });
                }
                else {
                    res.json({ error: true, result: '', text: 'password is not valid' });
                }
            });

        }
        else {
            res.json({ error: true, result: '', text: 'Account is not activated yet,check your email and confirm your account.' });
        }
    });
});


function loadTemplate(templateName, contexts) {
    let template = new EmailTemplate(path.join(__dirname, '../templates', templateName));
    return Promise.all(contexts.map((context) => {
        return new Promise((resolve, reject) => {
            template.render(context, (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result,
                    context,
                });
            });
        });
    }));
}
function sendmailtoUser(foldername, users) {
    loadTemplate(foldername, users).then((results) => {
        return Promise.all(results.map((result) => {
            sendEmail(result.context.email, result.email.subject, result.email.html);
        }));
    }).then(() => {
        return true;
    }).catch((err) => {
        console.log('mail send errr' + err);
        return false;
    });

}

module.exports = router;


