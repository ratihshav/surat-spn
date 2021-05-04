import {
  GET_MASTER_GROUP,
  GET_MASTER_GROUP_SUCCESS,
  GET_MASTER_GROUP_FAIL,
  SAVE_MASTER_GROUP,
  SAVE_MASTER_GROUP_SUCCESS,
  SAVE_MASTER_GROUP_FAIL,
  DELETE_MASTER_GROUP,
  DELETE_MASTER_GROUP_SUCCESS,
  DELETE_MASTER_GROUP_FAIL,
  UPDATE_MASTER_GROUP,
  UPDATE_MASTER_GROUP_SUCCESS,
  UPDATE_MASTER_GROUP_FAIL,
  GET_DETAIL_GROUP,
  GET_DETAIL_GROUP_SUCCESS,
  GET_DETAIL_GROUP_FAIL
} from './actionTypes';

const initialState = {
  error: null,
  loading: false,
  data: []
}

const masterGroup = (state = initialState, action) => {
  switch (action.type) {
    //get master group
    case GET_MASTER_GROUP:
      return {
        ...state,
        loading: true
      };
    case GET_MASTER_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_MASTER_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //save master group
    case SAVE_MASTER_GROUP:
      return {
        ...state,
        loading: true
      };
    case SAVE_MASTER_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case SAVE_MASTER_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //delete master group 
    case DELETE_MASTER_GROUP:
      return {
        ...state,
        loading: true
      };
    case DELETE_MASTER_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case DELETE_MASTER_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //update master group
    case UPDATE_MASTER_GROUP:
      return {
        ...state,
        loading: true
      };
    case UPDATE_MASTER_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case UPDATE_MASTER_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //get detail group
    case GET_DETAIL_GROUP:
      return {
        ...state,
        loading: true
      };
    case GET_DETAIL_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_DETAIL_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default masterGroup;