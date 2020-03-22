import weather from "../containers/Weather/weather.reducer";
import {Map} from 'immutable';

export interface stateParams {
    type: string,
    payload: any
}

export interface rootState {
    router: any,
    authentication: Map<any, any>,
    register: Map<any, any>,
    weather: Map<string, any>
};
