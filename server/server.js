// server.js

// BASIC SETUP
// =============================================================================

// Call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var ev = require('express-validation');
var db = require(__dirname + '/models/index');
var _ = require('lodash');
// Sync the database models
db.sequelize.sync({
  // force: true
});

// Create an express app
var app = express();

// CORS Settings
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/static', express.static(path.join(__dirname, 'public')))



// Configure the app to use bodyParser()
// This will let us get the data from post
app.use(bodyParser.urlencoded({extended: true,limit:'5mb'}));
app.use(bodyParser.json());



// ROUTES FOR OUR API
// =============================================================================

var Userrouter = require('./routers/user');
var Brewery_owner_router = require('./routers/brewery_owner');
var location_router = require('./routers/location');
var beer_router = require('./routers/beer');
var amenities_router = require('./routers/amenities');
var food_trucks_router = require('./routers/food_trucks');
var payment_router = require('./routers/payments');
var event_router = require('./routers/event');
var stamp_router = require('./routers/stamps');
var cron_router = require('./routers/cronjob');
var router = express.Router();

// All of our routes will console log a status
app.use(function (req, res, next) {
  //console.log('==========================================');
  //console.log(req.method + ': ' + req.url);
  next();
});

// Ideally, this route sends the index.html
router.get('/', function (req, res) {
  res.json({
    message: 'Brew Pub App Server!'
  });
});


app.use('/api/user', Userrouter);
app.use('/api/brew_owner',Brewery_owner_router);
app.use('/api/location', location_router);
app.use('/api/beer',beer_router);
app.use('/api/amenities',amenities_router);
app.use('/api/foodtruck',food_trucks_router);
app.use('/api/payment',payment_router);
app.use('/api/event',event_router);
app.use('/api/stamp',stamp_router);
app.use('/api/cron',cron_router);

app.use('/api', router);
// Send all other requests to the Angular app
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// error handler
app.use(function (err, req, res, next) {
  if (err instanceof ev.ValidationError){
    let infoarr=_.map(err.errors, 'messages');
    let info=_.join(infoarr, '\n');
    return res.json({error:true,result:[],text:info});
  }
 // if (err instanceof ev.ValidationError) return res.status(err.status).json(err);
  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).json(err.stack);
  } else {
    return res.status(500);
  }
});
module.exports = app;