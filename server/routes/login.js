var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var fs = require('fs');


// Get All Locations
router.post('/', loginRoute);
const path = require("path");
const RSA_PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../secure/private.pem"));

function loginRoute(req, res) {

    const email = req.body.email,
          password = req.body.password;

    // if (validateEmailAndPassword()) {
    if(true) {
    //    const userId = findUserIdForEmail(email);
       const userId = 55 + '';

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: userId
            });

          // send the JWT back to the user
          res.status(200).json({
            idToken: jwtBearerToken, 
            expiresIn: 7200
          });
          // TODO - multiple options available                              
    } else {
        // send status 401 Unauthorized
        res.sendStatus(401); 
    }
}

module.exports = router;
