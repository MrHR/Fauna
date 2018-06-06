export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';

export function userLogin(data) {
  return {
    type: USER_LOGIN,
    data
  }
}

export function userLogout(data) {
  return {
    type: USER_LOGOUT,
    data
  }
}

export function userRegister(data) {
  return {
    type: USER_REGISTER,
    data
  }
}