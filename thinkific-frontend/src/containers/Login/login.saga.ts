import {all, takeLatest, call, put, takeEvery} from 'redux-saga/effects';
import {push} from 'connected-react-router'
import {loginConstants} from './login.constants';
import {userServices} from '../../services/user.service';
import {loginActions} from "./login.action";

function* login({payload}: ReturnType<any>) {
    try {
        const res = yield call(userServices.auth, payload, 'login');
        localStorage.setItem('user', JSON.stringify(res.data));
        yield put(push('/weather'));
        yield put(loginActions.loginSuccess(res.data));
    } catch (e) {
        yield put(loginActions.loginError((e.response) ? e.response.data.message : 'Connection error'));
    }
}

function* logout({payload}: ReturnType<any>) {
    try {
        yield call(userServices.logout, payload);
        console.log('chua remove');
        localStorage.removeItem('user');
        console.log('da remove');
        yield put(loginActions.logoutSuccess());
        yield put(push('/login'));
    } catch (e) {
    }
}
function* loadUser() {
    let user = JSON.parse((localStorage.getItem('user') as string));
    if(user) {
        yield put(loginActions.loginSuccess(user));
    }
}
export default function* rootSaga() {
    yield all([
        takeLatest(loginConstants.LOGIN_REQUEST, login),
        takeLatest(loginConstants.LOGOUT, logout),
        takeEvery(loginConstants.LOAD_USER, loadUser)
    ]);
}
