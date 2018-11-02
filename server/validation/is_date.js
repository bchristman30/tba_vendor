var Joi = require('joi');
 
module.exports = {
  body: {
    searchdate: Joi.date().required()
  }
};