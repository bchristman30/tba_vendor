var jwt = require('jsonwebtoken');
var fs = require('fs');
const path = require('path');
const RSA_PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../secure/public.key"));

function verifyToken(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(200).send({ error: true, result:'',text: 'Authorization token is required' });
  }
  //var token = req.headers['x-access-token'];
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  if (!token)
    return res.status(200).send({ error: true, result:'',text: 'Token is required.' });
  jwt.verify(token, RSA_PUBLIC_KEY, function (err, decoded) {
    if (err) {
      return res.json({ error: true, result: err,text: 'Failed to authenticate token,please login again' });
    }
    else {
      req.userId = decoded.id;
      console.log(decoded.id);
      next();
      
    }
  });
}
module.exports = verifyToken;