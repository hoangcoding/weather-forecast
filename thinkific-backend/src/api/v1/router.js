const express = require('express');
const userRoutes = require('./user/routes');
const weatherRoutes = require('./weather/routes');

const router = express.Router();

/* GET API status */
router.get('/', (req, res) => {
  res.send('OK');
});

/**
 * v1/user routes
 */
router.use('/user', userRoutes);

/**
 * v1/weather routes
 */
router.use('/weather', weatherRoutes);

module.exports = router;
