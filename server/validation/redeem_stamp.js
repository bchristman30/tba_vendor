var Joi = require('joi');
 
module.exports = {
  body: {
    user_id: Joi.number().required(),
    location_id: Joi.number().required()
  }
};
