import {
  GET_MASTER_USER,
  GET_MASTER_USER_SUCCESS,
  GET_MASTER_USER_FAIL,
  SAVE_MASTER_USER,
  SAVE_MASTER_USER_SUCCESS,
  SAVE_MASTER_USER_FAIL,
  DELETE_MASTER_USER,
  DELETE_MASTER_USER_SUCCESS,
  DELETE_MASTER_USER_FAIL,
  UPDATE_MASTER_USER,
  UPDATE_MASTER_USER_SUCCESS,
  UPDATE_MASTER_USER_FAIL
} from './actionTypes';

const initialState = {
  error: null,
  loading: false,
  data: []
}

const masterUser = (state = initialState, action) => {
  switch (action.type) {
    //get master user
    case GET_MASTER_USER:
      return {
        ...state,
        loading: true
      };
    case GET_MASTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_MASTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //save master user
    case SAVE_MASTER_USER:
      return {
        ...state,
        loading: true
      };
    case SAVE_MASTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case SAVE_MASTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //delete master user 
    case DELETE_MASTER_USER:
      return {
        ...state,
        loading: true
      };
    case DELETE_MASTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case DELETE_MASTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //update master user
    case UPDATE_MASTER_USER:
      return {
        ...state,
        loading: true
      };
    case UPDATE_MASTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case UPDATE_MASTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default masterUser;