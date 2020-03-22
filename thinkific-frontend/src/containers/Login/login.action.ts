import {loginConstants} from './login.constants';

export const loginActions = {
    login,
    loginSuccess,
    loginError,
    logout,
    logoutSuccess,
    clearError
};

function login(payload: object) {
    return {type: loginConstants.LOGIN_REQUEST, payload}
}

function loginSuccess(user: object) {
    return {type: loginConstants.LOGIN_SUCCESS, payload: user}
}

function loginError(error: object) {
    return {type: loginConstants.LOGIN_FAILURE, payload: error}
}

function logout(refreshToken: string) {
    return {type: loginConstants.LOGOUT, payload: refreshToken};
}

function logoutSuccess() {
    return {type: loginConstants.LOGOUT_SUCCESS};
}
function clearError() {
    return {type: loginConstants.CLEAR_ERROR};
}

