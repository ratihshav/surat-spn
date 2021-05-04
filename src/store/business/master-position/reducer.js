import {
  GET_MASTER_POSITION,
  GET_MASTER_POSITION_SUCCESS,
  GET_MASTER_POSITION_FAIL,
  SAVE_MASTER_POSITION,
  SAVE_MASTER_POSITION_SUCCESS,
  SAVE_MASTER_POSITION_FAIL,
  DELETE_MASTER_POSITION,
  DELETE_MASTER_POSITION_SUCCESS,
  DELETE_MASTER_POSITION_FAIL,
  UPDATE_MASTER_POSITION,
  UPDATE_MASTER_POSITION_SUCCESS,
  UPDATE_MASTER_POSITION_FAIL,
  GET_DETAIL_POSITION,
  GET_DETAIL_POSITION_SUCCESS,
  GET_DETAIL_POSITION_FAIL
} from './actionTypes';

const initialState = {
  error: null,
  loading: false,
  data: []
}

const masterPosition = (state = initialState, action) => {
  switch (action.type) {
    //get master position
    case GET_MASTER_POSITION:
      return {
        ...state,
        loading: true
      };
    case GET_MASTER_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_MASTER_POSITION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //save master position
    case SAVE_MASTER_POSITION:
      return {
        ...state,
        loading: true
      };
    case SAVE_MASTER_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case SAVE_MASTER_POSITION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //delete master position 
    case DELETE_MASTER_POSITION:
      return {
        ...state,
        loading: true
      };
    case DELETE_MASTER_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case DELETE_MASTER_POSITION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //update master position
    case UPDATE_MASTER_POSITION:
      return {
        ...state,
        loading: true
      };
    case UPDATE_MASTER_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case UPDATE_MASTER_POSITION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //get detail position
    case GET_DETAIL_POSITION:
      return {
        ...state,
        loading: true
      };
    case GET_DETAIL_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_DETAIL_POSITION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default masterPosition;