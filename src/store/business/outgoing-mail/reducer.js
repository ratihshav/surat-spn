import {
  GET_OUTGOING_MAIL,
  GET_OUTGOING_MAIL_SUCCESS,
  GET_OUTGOING_MAIL_FAIL,
  CREATE_OUTGOING_MAIL,
  CREATE_OUTGOING_MAIL_SUCCESS,
  CREATE_OUTGOING_MAIL_FAIL,
  DELETE_OUTGOING_MAIL,
  DELETE_OUTGOING_MAIL_SUCCESS,
  DELETE_OUTGOING_MAIL_FAIL,
  GET_DETAIL_OUTGOING_MAIL,
  GET_DETAIL_OUTGOING_MAIL_SUCCESS,
  GET_DETAIL_OUTGOING_MAIL_FAIL,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
  CREATE_DISPOSE_OUTGOING_MAIL,
  CREATE_DISPOSE_OUTGOING_MAIL_SUCCESS,
  CREATE_DISPOSE_OUTGOING_MAIL_FAIL
} from './actionTypes';

const initialState = {
  error: null,
  loading: false,
  data: []
}

const outgoingMail = (state = initialState, action) => {
  switch (action.type) {
    //get master group
    case GET_OUTGOING_MAIL:
      return {
        ...state,
        loading: true
      };
    case GET_OUTGOING_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_OUTGOING_MAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //save master group
    case CREATE_OUTGOING_MAIL:
      return {
        ...state,
        loading: true
      };
    case CREATE_OUTGOING_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case CREATE_OUTGOING_MAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //delete master group 
    case DELETE_OUTGOING_MAIL:
      return {
        ...state,
        loading: true
      };
    case DELETE_OUTGOING_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case DELETE_OUTGOING_MAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //get detail group
    case GET_DETAIL_OUTGOING_MAIL:
      return {
        ...state,
        loading: true
      };
    case GET_DETAIL_OUTGOING_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_DETAIL_OUTGOING_MAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //search user
    case SEARCH_USER:
      return {
        ...state,
        loading: true
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case SEARCH_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    //dispose mail
    case CREATE_DISPOSE_OUTGOING_MAIL:
      return {
        ...state,
        loading: true
      };
    case CREATE_DISPOSE_OUTGOING_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case CREATE_DISPOSE_OUTGOING_MAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default outgoingMail;