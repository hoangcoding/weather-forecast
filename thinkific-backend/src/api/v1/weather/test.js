const { callOpenWeather } = require('./controller');

describe('Weather tests', () => {
  it('should return weather for a city', async () => {
    const data = await callOpenWeather('Vancouver');
    expect(data).toHaveProperty('weather');
  });
});
