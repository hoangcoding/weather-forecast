import {all, call, put, takeLatest} from 'redux-saga/effects';
import {registerConstants} from "./register.constants";
import {userServices} from "../../services/user.service";
import {push} from "connected-react-router";
import {registerActions} from "./register.action";
import {loginActions} from "../Login/login.action";


function* register({payload}: ReturnType<any>) {
    try {
        const res = yield call(userServices.auth, payload, 'register');
        localStorage.setItem('user', JSON.stringify(res.data));
        yield put(registerActions.registerSuccess(res.data));
        yield put(loginActions.loginSuccess(res.data));
        yield put(push('/weather'));
    } catch (e) {
        yield put(registerActions.registerError((e.response) ? e.response.data.message : 'Connection error'));
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(registerConstants.REGISTER_REQUEST, register),
    ]);
}
