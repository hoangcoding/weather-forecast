const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { ValidationError } = require('express-validation');
const router = require('./api/v1/router');

const corsOptions = {
  exposedHeaders: 'authorization, x-refresh-token, x-token-expiry-time',
};

const app = express();
app.use(express.json());

app.use(logger('dev'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

// Mount api v1 routes
app.use('/api/v1', router);

// Validation error response
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  const status = err.status || 500;
  return res.status(status).json(err);
});

module.exports = app;
