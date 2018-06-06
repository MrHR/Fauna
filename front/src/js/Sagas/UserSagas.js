import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Auth from './../Modules/Auth'
import axios from 'axios';

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED
} from './../Actions/UserActions';

function* userRegister(action) {
  try {
    
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/register`
    });
    yield put({ type: USER_REGISTER_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: USER_REGISTER_FAILED, message: e.message });
  }
}

function* userLogin(action) {
  try {
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/login`
    });

    Auth.authenticateUser(result.data);

    yield put({ type: USER_LOGIN_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: USER_LOGIN_FAILED, message: e.message });
  }
}

function* userLogout(action) {
  try {
    const result = yield axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/user/logout`
    });
    Auth.deauthenticateUser()

    yield put({ type: USER_LOGOUT_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: USER_LOGOUT_FAILED, message: e.message });
  }
}


function* userSagas() {
  yield takeEvery(USER_LOGIN, userLogin);
  yield takeEvery(USER_REGISTER, userRegister);
}

export default userSagas;