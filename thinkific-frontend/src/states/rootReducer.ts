import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import {History} from "history";
import login from '../containers/Login/login.reducer';
import register from '../containers/Register/register.reducer';
import weather from '../containers/Weather/weather.reducer';


// @ts-ignore
const createRootReducer = (history: History<S>) => combineReducers({
    router: connectRouter(history),
    authentication: login,
    register: register,
    weather,
});

export default createRootReducer;
