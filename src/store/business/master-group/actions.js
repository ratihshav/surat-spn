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

//get 
export const getMasterGroup = (request) => ({
  type: GET_MASTER_GROUP,
  payload: request
});

export const getMasterGroupSuccess = response => ({
  type: GET_MASTER_GROUP_SUCCESS,
  payload: response
});

export const getMasterGroupFail = error => ({
  type: GET_MASTER_GROUP_FAIL,
  payload: error
});

//create
export const saveMasterGroup = (request) => (
  {
    type: SAVE_MASTER_GROUP,
    payload: { request }
  });

export const saveMasterGroupSuccess = response => ({
  type: SAVE_MASTER_GROUP_SUCCESS,
  payload: response
});

export const saveMasterGroupFail = error => ({
  type: SAVE_MASTER_GROUP_FAIL,
  payload: error
});


//delete
export const deleteMasterGroup = (request) => (
  {
    type: DELETE_MASTER_GROUP,
    payload: { request }
  });

export const deleteMasterGroupSuccess = response => ({
  type: DELETE_MASTER_GROUP_SUCCESS,
  payload: response
});

export const deleteMasterGroupFail = error => ({
  type: DELETE_MASTER_GROUP_FAIL,
  payload: error
});

//update
export const updateMasterGroup = (request) => {
  return {
    type: UPDATE_MASTER_GROUP,
    payload: { request }
  };
}

export const updateMasterGroupSuccess = response => {
  return {
    type: UPDATE_MASTER_GROUP_SUCCESS,
    payload: response
  }
}

export const updateMasterGroupFail = error => ({
  type: UPDATE_MASTER_GROUP_FAIL,
  payload: error
});


//detail
export const getDetailGroup = (request) => {
  return {
    type: GET_DETAIL_GROUP,
    payload: { request }
  };
}

export const getDetailGroupSuccess = response => {
  return {
    type: GET_DETAIL_GROUP_SUCCESS,
    payload: response
  }
}

export const getDetailGroupFail = error => ({
  type: GET_DETAIL_GROUP_FAIL,
  payload: error
});

