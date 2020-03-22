const express = require('express');
const { validate } = require('express-validation');
const controller = require('./controller');

const {
  getWeather,
} = require('./validation');

const { authorize } = require('../../../middlewares/auth');

const routes = express.Router();

routes.route('/getWeather').get(validate(getWeather), authorize(), controller.getWeather);

module.exports = routes;
