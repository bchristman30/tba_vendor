var app = require('./server/server.js');
const log4js = require('log4js');
var request = require('request');

const logger = log4js.getLogger('Brew_pub');
// START THE SERVER
// =============================================================================
var port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log('Server is listening on ' + port);
});
