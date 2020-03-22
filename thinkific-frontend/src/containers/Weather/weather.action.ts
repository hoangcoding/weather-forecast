import {weatherConstants} from './weather.constants';

export const weatherActions = {
    getWeather,
    getWeatherSuccess,
    getWeatherError
};

function getWeather(city: string) {
    return {type: weatherConstants.LOAD_WEATHER, payload: city}
}

function getWeatherSuccess(weather: object) {
    return {type: weatherConstants.LOAD_WEATHER_SUCCESS, payload: weather}
}

function getWeatherError(error: object) {
    return {type: weatherConstants.LOAD_WEATHER_ERROR, payload: error}
}
