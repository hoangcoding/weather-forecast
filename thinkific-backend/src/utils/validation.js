const { Joi } = require('express-validation');

const headers = {
  headers: Joi.object({
    authorization: Joi.string()
      .trim()
      .required()
      .label('Auth Token'),
  }).options({ allowUnknown: true }),
};

module.exports = { headers };
