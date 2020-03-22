const axios = require('axios');
const httpStatus = require('http-status');
const { openWeatherEndpoint, openWeatherAPIKey } = require('../../../config');
const { Error } = require('../../../utils/api-response');

/**
 * Get weather
 * @public
 */
exports.getWeather = async (req, res, next) => {
  try {
    const { city } = req.query;
    const data = await this.callOpenWeather(city);
    if (!data) {
      throw new Error({
        message: 'No data found',
        status: httpStatus.NOT_FOUND,
      });
    }
    return res.json(filterWeatherData(data));
  } catch (error) {
    return next(error);
  }
};

exports.callOpenWeather = async (query) => {
  try {
    const queryUrl = openWeatherEndpoint.replace('#query', query).replace('#api_key', openWeatherAPIKey);
    const response = await axios.get(queryUrl);
    return response.data;
  } catch (error) {
    throw new Error({
      message: 'No data found',
      status: httpStatus.NOT_FOUND,
    });
  }
};
const filterWeatherData = (data) => ({
  // Only get the first weather available
  icon: data.weather[0].icon,
  main: data.weather[0].main,
  description: data.weather[0].description,
  temperature: data.main.temp,
  dt: data.dt,
  timezone: data.timezone,
  cityName: data.name,
  country: data.sys.country,
});
