var app = require('./server/server.js');
const log4js = require('log4js');
var request = require('request');

var CronJob = require('cron').CronJob;
var host="https://tba-vendor-dev.herokuapp.com";
log4js.configure({
  appenders: { Brew_pub: { type: 'file', filename: './log/cronjob.log' } },
  categories: { default: { appenders: ['Brew_pub'], level: 'info' } }
});
const logger = log4js.getLogger('Brew_pub');
// START THE SERVER
// =============================================================================
var port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log('Server is listening on ' + port);
});
/*  ----------cron job-----------------*/
new CronJob('30 * * * * *', function () {
  request(host+'/api/cron/update_stamp_details', function (error, response, body) {
      logger.info(body);
  });
}, null, true, "America/Los_Angeles");

/*---------------cron job end-----------------------*/