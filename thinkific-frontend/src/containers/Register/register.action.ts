import {registerConstants} from "./register.constants";

export const registerActions = {
    register,
    registerSuccess,
    registerError,
};

function register(user: object) {
    return {type: registerConstants.REGISTER_REQUEST, payload: user}
}

function registerSuccess(user: object) {
    return {type: registerConstants.REGISTER_SUCCESS, payload: user}
}

function registerError(error: object) {
    return {type: registerConstants.REGISTER_FAILURE, payload: error}
}
