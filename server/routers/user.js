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

/**************************
 * FORGET PASSWORD ROUTES *
 **************************/
router.route('/forgetpassword').post(function (req, res) {
  if (req.body) {
    let host;
    if (req.secure == true) {
      host = 'https://' + req.headers.host;
    }
    else {
      host = 'http://' + req.headers.host;
    }
    db.users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      if (!user) {
        res.json({ error: true, result: '', text: 'There is no user for this userid' });
      }
      else {
        let users = [{
          name: 'User',
          id: user.id,
          email: user.email,
          token: md5(user.id),
          host: host
        }];
        user.update({ forgettoken: md5(user.id) }).then((response) => {
          sendmailtoUser('Forgetpassword', users);
          res.json({ error: false, result: '', text: 'Password recovery email has been sent on your mail id' });
        }).catch((err) => {
          res.json({ error: true, result: err, text: 'Error found during updation' });
        });
      }
    }).catch((err) => {
      res.json({ error: true, result: err, text: 'Something is wrong!!' });
    });
  }
  else {
    res.json({ error: true, result: '', text: 'parameter not found' });
  }
});

/**************************
 * UPDATE PASSWORD ROUTES *
 **************************/

router.route('/updatepassword').post(function (req, res) {
  if (req.body) {
    db.users.findOne({
      where: {
        id: req.body.userid
      }
    }).then(function (user) {
      if (!user) {
        res.json({ error: true, result: '', text: 'User does not exist.' });
      }
      else if (user.forgettoken == req.body.forgettoken) {
        bcrypt.hash(req.body.newpassword, saltRounds, function (err, newhash) {
          // let users = [{
          //   name: 'User',
          //   id: user.id,
          //   email: user.email
          // }];
          //sendmailtoUser('Passwordchangeconfirmation', users);
          user.update({ password: newhash, forgettoken: '' }).then((response) => {
            res.json({ error: false, result: '', text: 'Your password has been updated' });
          }).catch((err) => {
            res.json({ error: true, result: err, text: 'Error found during updation' });
          });
        });
      }
      else {
        res.json({ error: true, result: err, text: 'Recovery password token does not exist' });
      }
    }).catch((err) => {
      res.json({ error: true, result: err, text: 'Password recovery email has been sent on your mail id' });
    });

  }
  else {
    res.json({ error: true, result: '', text: 'parameter not found' });
  }
});

/*******************************
 * CHANGE PASSWORD AFTER LOGIN *
 *******************************/
router.route('/changepassword').post(function (req, res) {
  if (req.body) {

    bcrypt.hash(req.body.currentpassword, saltRounds, function (err, hash) {

      db.users.findOne({
        where: {
          id: req.body.userid
        }
      }).then(function (user) {
        if (!user) {
          res.json({ error: true, result: '', text: 'User does not exist.' });
        }
        else if (user.forgettoken == req.body.forgettoken) {
          bcrypt.compare(req.body.currentpassword, user.password, function (err, response) {
            if (err) {
              res.json({ error: true, result: err, text: 'errr' });
            }
            else if (response) {
              bcrypt.hash(req.body.newpassword, saltRounds, function (err, newhash) {
                // let users = [{
                //   name: 'User',
                //   id: user.id,
                //   email: user.email
                // }];
                //sendmailtoUser('Passwordchangeconfirmation', users);
                user.update({ password: newhash, forgettoken: '' }).then((response) => {
                  res.json({ error: false, result: '', text: 'Your password has been updated' });
                }).catch((err) => {
                  res.json({ error: true, result: err, text: 'Error found during updation' });
                });
              });
            }
            else {
              res.json({ error: false, result: '', text: 'current password is not correct' });
            }
          });
        }
        else {
          res.json({ error: true, result: err, text: 'Recovery password token does not exist' });
        }
      }).catch((err) => {
        res.json({ error: true, result: err, text: 'Password recovery email has been sent on your mail id' });
      });
    });
  }
  else {
    res.json({ error: true, result: '', text: 'parameter not found' });
  }
});

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
      db.users.create(req.body).then(response => {
        let users = [{
          name: 'User',
          id: response.id,
          key: req.body.confirmation_key,
          email: response.email,
          type:1,
          host: host
        }];
        sendmailtoUser('Confirmation', users);
        res.json({ error: false, result: { isverify: response.isverify, id: response.id, email: response.email }, text: 'Your account has been created successfully,cheers!!,please check your email id for the confirmation!! ' });
      }).catch((err) => {
        res.json({ error: true, result: '', text: err.errors[0].message });
      });
    });
  }
  else {
    res.json({ error: true, result: '', text: 'parameter not found' });
  }
});

/******************************************************************************************
 * CONFIRM ACCOUNT *
 ******************************************************************************************/
router.get('/confirm_account', validate(require('../validation/confirm_user.js')), function (req, res) {

  db.users.findOne({
    where: {
      id: req.query.id,
      confirmation_key: req.query.key
    }
  }).then(function (user) {
    if (!user) {
      res.json({ error: false, result: 'failed', text: 'user not found' });
    }
    else {
      user.update({ isverify: 1, confirmation_key: '' }).then((response) => {

        res.json({ error: false, result: 'success', text: 'Your account has been successfully verfied' });
      }).catch((err) => {

        res.json({ error: true, result: 'error', text: 'Error during updation,try again later!!' });
      });
    }
  }).catch((err) => {
    res.json({ error: true, result: 'error', text: 'Something went wrong!!' });
  });
});

router.post('/login', validate(require('../validation/login.js')), function (req, res) {
  db.users.findOne({
    where: {
      email: req.body.email
    },
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
            let sub_exp_date = moment(new Date(user.subscription_expiry_date)); //TS
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
          res.json({ error: false, result: obj, idToken: token, expiresIn: expiretimestamp, text: 'Welcome ' + user.username + ',your are successfully logged in!!' });
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

/***********************************************
 * USER DETAILS WITH STAMPED BREWERY DETAILS!! *
 * URL:/api/user/id/{user_id}
 ***********************************************/

router.get('/id/:userid', verifytoken, function (req, res) {
  if (!validator.isInt(req.params.userid)) {
    res.json({ error: true, result: '', text: 'user_id is not a valid id' });
  }
  else {
    db.users.findOne({
      attributes: ['id', 'username', 'email', 'latitude', 'longitude', 'created_at', 'isverify'],
      where: {
        id: req.params.userid
      },
      include: [{
        attributes: ['id', 'stamp', 'location_id', 'user_id', 'updated_at'],
        where: { stamp: true },
        required: false,
        model: db.user_location_stamp
      }]
    }).then(function (user) {
      if (!user) {
        res.json({ error: true, result: '', text: 'There is no user for this userid' });
      }
      else {
        if (user.user_location_stamps.length > 0) {
          let infoarr = _.map(user.user_location_stamps, function (value) {
            return value['location_id'];
          });
          db.locations.findAll({
            attributes: ['id', 'name', 'logo_string', 'address', 'state', 'city', 'zipcode', 'phone', 'website_url', 'instagram', 'description'],
            where: {
              id: infoarr //[1,2,3,4]
            }
          }).then((locations) => {
            var merge = _.map(user.user_location_stamps, function (item) {
              return _.merge(item, _.find(locations, { 'id': item.location_id }));
            });
            res.json({ error: false, result: merge, text: 'user details with stamped brewery details!!' });
          }).catch((err) => {
            res.json({ error: true, result: err, text: 'error found' });
          })
        }
      }
    });
  }
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
/* -----sample test-------------
let users = [{
  name: 'User',
  email: 'monu_kanyal@esferasoft.com'
}];
sendmailtoUser(users);
-----------------------------*/
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








