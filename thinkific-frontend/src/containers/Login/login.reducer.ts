import {loginConstants} from './login.constants';
import Immutable from "immutable";
import {stateParams} from "../../states/types";

let user = JSON.parse((localStorage.getItem('user') as string));
const initialState = Immutable.fromJS(user ?
    {
        isLoading: false,
        loggedIn: true,
        user,
        error: '',
    }
    : {}
);

export default function login(state = initialState, {type, payload}: stateParams) {
    switch (type) {
        case loginConstants.LOGIN_REQUEST:
            return state.merge({
                isLoading: true,
                error: '',
            });
        case loginConstants.LOGIN_SUCCESS:
            return state.merge({
                loggedIn: true,
                user: payload,
                isLoading: false,
                error: '',
            });
        case loginConstants.LOGIN_FAILURE:
            return state.merge({
                isLoading: false,
                error: payload
            });
        case loginConstants.LOGOUT_SUCCESS:
            return Immutable.fromJS({});
        case loginConstants.CLEAR_ERROR:
            return state.set('error', '');
        default:
            return state
    }
}
