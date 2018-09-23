var Joi = require('joi');
 
module.exports = {
  body: {
    stripeToken: Joi.string().required(),
    user_id: Joi.number().required()
  }
};