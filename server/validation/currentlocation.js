var Joi = require('joi');
 
module.exports = {
  body: {
    currentLat: Joi.number().required(),
    currentLng: Joi.number().required()
  }
};
