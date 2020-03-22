require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_INTERVAL_DAYS || 60 * 12,
  jwtSecret: process.env.JWT_SECRET || 'Fji3j3i9g9GOgo3i9o3o30gOFFIFIufu28fj2fiu',
  mongo: { uri: process.env.MONGO_URI || 'mongodb+srv://user:password@123@cluster0-s56zw.mongodb.net/test?retryWrites=true&w=majority' },
  port: process.env.PORT || 5000,
  openWeatherEndpoint: 'http://api.openweathermap.org/data/2.5/weather?q=#query&APPID=#api_key',
  openWeatherAPIKey: process.env.OPENWEATHER_API_KEY || 'a990f18f6713da41c9d9ae0c643dafb5',
};

module.exports = config;
