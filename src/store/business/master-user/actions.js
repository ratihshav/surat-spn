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
    UPDATE_MASTER_USER_FAIL,
    GET_DETAIL_USER,
    GET_DETAIL_USER_SUCCESS,
    GET_DETAIL_USER_FAIL,
    CHANGE_PASSWORD_USER,
    CHANGE_PASSWORD_USER_SUCCESS,
    CHANGE_PASSWORD_USER_FAIL,
    CHANGE_PHOTO_USER,
    CHANGE_PHOTO_USER_SUCCESS,
    CHANGE_PHOTO_USER_FAIL,

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
    {
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
        type: DELETE_MASTER_USER,
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
export const updateMasterUser = (request) => {
    return {
        type: UPDATE_MASTER_USER,
        payload: { request }
    };
}

export const updateMasterUserSuccess = response => {
    return {
        type: UPDATE_MASTER_USER_SUCCESS,
        payload: response
    }
}

export const updateMasterUserFail = error => ({
    type: UPDATE_MASTER_USER_FAIL,
    payload: error
});


//detail
export const getDetailUser = (request) => {
    return {
        type: GET_DETAIL_USER,
        payload: { request }
    };
}

export const getDetailUserSuccess = response => {
    return {
        type: GET_DETAIL_USER_SUCCESS,
        payload: response
    }
}

export const getDetailUserFail = error => ({
    type: GET_DETAIL_USER_FAIL,
    payload: error
});

//change password
export const changePasswordUser = (request) => {
    return {
        type: CHANGE_PASSWORD_USER,
        payload: { request }
    };
}

export const changePasswordUserSuccess = response => {
    return {
        type: CHANGE_PASSWORD_USER_SUCCESS,
        payload: response
    }
}

export const changePasswordUserFail = error => ({
    type: CHANGE_PASSWORD_USER_FAIL,
    payload: error
});


//change photo
export const changePhotoUser = (request) => {
    return {
        type: CHANGE_PHOTO_USER,
        payload: { request }
    };
}

export const changePhotoUserSuccess = response => {
    return {
        type: CHANGE_PHOTO_USER_SUCCESS,
        payload: response
    }
}

export const changePhotoUserFail = error => ({
    type: CHANGE_PHOTO_USER_FAIL,
    payload: error
});


