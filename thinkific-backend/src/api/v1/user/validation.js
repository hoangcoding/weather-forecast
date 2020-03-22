const { Joi } = require('express-validation');
const { headers } = require('../../../utils/validation');


module.exports = {
  // POST api/v1/user/login
  login: {
    body: Joi.object({
      email: Joi.string()
        .required()
        .lowercase()
        .trim()
        .label('Email or phone number'),
      password: Joi.string()
        .min(8)
        .max(16)
        .required()
        .trim(),
    }),
  },

  // Get api/v1/user/refresh-token
  refreshToken: {
    body: Joi.object({
      refreshToken: Joi.string()
        .required()
        .trim(),
    }),
  },

  // Post api/v1/user/logout
  logout: {
    ...headers,
    body: Joi.object({
      refreshToken: Joi.string()
        .required()
        .trim(),
    }),
  },
  // POST api/v1/user/register
  register: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required(),
      firstName: Joi.string()
        .trim()
        .lowercase(),
      lastName: Joi.string()
        .trim()
        .lowercase(),
      password: Joi.string()
        .min(8)
        .max(16)
        .required()
        .trim(),
    }),
  },
};
