import axios from "../config/initializers/axios";

const path = '/weather';
export const weatherServices = {
    getWeather
};

async function getWeather(city: string) {
    return await axios.get(`${path}/getWeather?city=${city}`);
}
