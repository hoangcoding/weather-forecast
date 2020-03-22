import Immutable from "immutable";
import {stateParams} from "../../states/types";
import {weatherConstants} from "./weather.constants";

const initialState = Immutable.fromJS({
    weather: null,
    isLoading: false,
    error: ''
});


export default function weather(state = initialState, {type, payload}: stateParams) {
    switch (type) {
        case weatherConstants.LOAD_WEATHER:
            return state.merge({
                isLoading: true,
                weather: null,
                error: ''
            });
        case weatherConstants.LOAD_WEATHER_SUCCESS:
            return state.merge({
                weather: payload,
                isLoading: false,
                error: ''
            });
        case weatherConstants.LOAD_WEATHER_ERROR:
            return state.merge({
                isLoading: false,
                error: payload
            });
        default:
            return state;
    }
}
