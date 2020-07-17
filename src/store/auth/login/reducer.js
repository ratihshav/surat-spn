import { REHYDRATE } from 'redux-persist/lib/constants';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL
} from './actionTypes';

const initialState = {
  error: null,
  loading: false,
  data: null
}

const login = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_USER:
      return {
        ...state,
        loading: true
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }


    case LOGOUT_USER:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state;
  }

}

export default login;