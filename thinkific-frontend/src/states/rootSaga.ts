import {all} from "redux-saga/effects";
import weatherSagas from '../containers/Weather/weather.saga';
import loginSagas from '../containers/Login/login.saga';
import registerSagas from '../containers/Register/register.saga';

export default function* rootSaga() {
    yield all([
        weatherSagas(),
        loginSagas(),
        registerSagas()
    ]);
}
