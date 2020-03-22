import {all, takeLatest, call, put} from 'redux-saga/effects';
import {weatherConstants} from "./weather.constants";
import {weatherServices} from "../../services/weather.service";
import {weatherActions} from "./weather.action";


function* loadWeather({payload}: ReturnType<any>) {
    try {
        const res = yield call(weatherServices.getWeather,payload);
        yield put(weatherActions.getWeatherSuccess(res.data));
    } catch (e) {
        yield put(weatherActions.getWeatherError((e.response) ? e.response.data.message : 'Connection error'));
    }

}

export default function* rootSaga() {
    yield all([
        takeLatest(weatherConstants.LOAD_WEATHER, loadWeather),
    ]);
}
