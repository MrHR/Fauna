
import {
	USER_LOGOUT,
	USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,

  USER_LOGIN,
	USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,

} from './../Actions/UserActions';

const initialState = {
  loading: false,
  registered: false,
  logout: false
}

export function UserReducer(state = initialState, action) {
	switch(action.type) {

		case USER_LOGOUT:
			return { 
				...state,
				loading: true
      }
    
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: false,
        logout: true
      }

    case USER_LOGIN:
			return { 
				...state,
				loading: true
      }
    
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: true,
        logout: false
      }

    case USER_REGISTER:
			return { 
				...state,
				loading: true
      }
    
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: true,
        logout: false
      }

		default: 
			return state;
	}
}