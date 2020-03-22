const { Joi } = require('express-validation');
const { headers } = require('../../../utils/validation');

module.exports = {
  // Get api/v1/weather/getWeather
  getWeather: {
    ...headers,
    query: Joi.object({
      city: Joi.string()
        .required()
        .trim(),
    }),
  },
};
