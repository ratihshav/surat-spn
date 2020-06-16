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

//get 
export const getMasterPosition = (request) => ({
  type: GET_MASTER_POSITION,
  payload: request
});

export const getMasterPositionSuccess = response => ({
  type: GET_MASTER_POSITION_SUCCESS,
  payload: response
});

export const getMasterPositionFail = error => ({
  type: GET_MASTER_POSITION_FAIL,
  payload: error
});

//create
export const saveMasterPosition = (request) => (
  {
      type: SAVE_MASTER_POSITION,
      payload: { request }
  });

export const saveMasterPositionSuccess = response => ({
  type: SAVE_MASTER_POSITION_SUCCESS,
  payload: response
});

export const saveMasterPositionFail = error => ({
  type: SAVE_MASTER_POSITION_FAIL,
  payload: error
});


//delete
export const deleteMasterPosition = (request) => (
  {
      type: DELETE_MASTER_POSITION,
      payload: { request }
  });

export const deleteMasterPositionSuccess = response => ({
  type: DELETE_MASTER_POSITION_SUCCESS,
  payload: response
});

export const deleteMasterPositionFail = error => ({
  type: DELETE_MASTER_POSITION_FAIL,
  payload: error
});

//update
export const updateMasterPosition = (request) => {
  return {
      type: UPDATE_MASTER_POSITION,
      payload: { request }
  };
}

export const updateMasterPositionSuccess = response => {
  return {
      type: UPDATE_MASTER_POSITION_SUCCESS,
      payload: response
  }
}

export const updateMasterPositionFail = error => ({
  type: UPDATE_MASTER_POSITION_FAIL,
  payload: error
});


//detail
export const getDetailPosition = (request) => {
  return {
      type: GET_DETAIL_POSITION,
      payload: { request }
  };
}

export const getDetailPositionSuccess = response => {
  return {
      type: GET_DETAIL_POSITION_SUCCESS,
      payload: response
  }
}

export const getDetailPositionFail = error => ({
  type: GET_DETAIL_POSITION_FAIL,
  payload: error
});

