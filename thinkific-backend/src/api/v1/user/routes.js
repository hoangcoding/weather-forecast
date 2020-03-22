const express = require('express');
const { validate } = require('express-validation');
const controller = require('./controller');

const {
  register,
  login,
  refreshToken,
} = require('./validation');

const { authorize } = require('../../../middlewares/auth');

const routes = express.Router();

routes.route('/register').post(validate(register), controller.register);
routes.route('/refresh-token').post(validate(refreshToken), controller.refreshToken);
routes.route('/login').post(validate(login), controller.login);
routes.route('/logout').put(validate(refreshToken), authorize(), controller.logout);

module.exports = routes;
