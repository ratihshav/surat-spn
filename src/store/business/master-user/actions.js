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

//get 
export const getMasterUser = (request) => ({
    type: GET_MASTER_USER,
    payload: request
});

export const getMasterUserSuccess = response => ({
    type: GET_MASTER_USER_SUCCESS,
    payload: response
});

export const getMasterUserFail = error => ({
    type: GET_MASTER_USER_FAIL,
    payload: error
});

//create
export const saveMasterUser = (request) => (
    console.log('req', request), {
        type: SAVE_MASTER_USER,
        payload: { request }
    });

export const saveMasterUserSuccess = response => ({
    type: SAVE_MASTER_USER_SUCCESS,
    payload: response
});

export const saveMasterUserFail = error => ({
    type: SAVE_MASTER_USER_FAIL,
    payload: error
});


//delete
export const deleteMasterUser = (request) => (
    {
        type: UPDATE_MASTER_USER,
        payload: { request }
    });

export const deleteMasterUserSuccess = response => ({
    type: DELETE_MASTER_USER_SUCCESS,
    payload: response
});

export const deleteMasterUserFail = error => ({
    type: DELETE_MASTER_USER_FAIL,
    payload: error
});

//update
export const updateMasterUser = (request) => (
    {
        type: DELETE_MASTER_USER,
        payload: { request }
    });

export const updateMasterUserSuccess = response => ({
    type: UPDATE_MASTER_USER_SUCCESS,
    payload: response
});

export const updateMasterUserFail = error => ({
    type: UPDATE_MASTER_USER_FAIL,
    payload: error
});
