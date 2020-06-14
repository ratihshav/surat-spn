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

//get 
export const getOutgoingMail = (request) => ({
    type: GET_OUTGOING_MAIL,
    payload: { request }
});

export const getOutgoingMailSuccess = response => ({
    type: GET_OUTGOING_MAIL_SUCCESS,
    payload: response
});

export const getOutgoingMailFail = error => ({
    type: GET_OUTGOING_MAIL_FAIL,
    payload: error
});

//create
export const createOutgoingMail = (request) => (
    {
        type: CREATE_OUTGOING_MAIL,
        payload: { request }
    });

export const createOutgoingMailSuccess = response => ({
    type: CREATE_OUTGOING_MAIL_SUCCESS,
    payload: response
});

export const createOutgoingMailFail = error => ({
    type: CREATE_OUTGOING_MAIL_FAIL,
    payload: error
});


//delete
export const deleteOutgoingMail = (request) => (
    {
        type: DELETE_OUTGOING_MAIL,
        payload: { request }
    });

export const deleteOutgoingMailSuccess = response => ({
    type: DELETE_OUTGOING_MAIL_SUCCESS,
    payload: response
});

export const deleteOutgoingMailFail = error => ({
    type: DELETE_OUTGOING_MAIL_FAIL,
    payload: error
});

//detail
export const getDetailOutgoingMail = (request) => {
    return {
        type: GET_DETAIL_OUTGOING_MAIL,
        payload: { request }
    };
}

export const getDetailOutgoingMailSuccess = response => {
    return {
        type: GET_DETAIL_OUTGOING_MAIL_SUCCESS,
        payload: response
    }
}

export const getDetailOutgoingMailFail = error => ({
    type: GET_DETAIL_OUTGOING_MAIL_FAIL,
    payload: error
});

//search user 
export const searchUser = (request) => {
    return {
        type: SEARCH_USER,
        payload: { request }
    };
}

export const searchUserSuccess = response => {
    return {
        type: SEARCH_USER_SUCCESS,
        payload: response
    }
}

export const searchUserFail = error => ({
    type: SEARCH_USER_FAIL,
    payload: error
});

//dispose mail
export const createDisposeOutgoingMail = (request) => (
    {
        type: CREATE_DISPOSE_OUTGOING_MAIL,
        payload: { request }
    });

export const createDisposeOutgoingMailSuccess = response => ({
    type: CREATE_DISPOSE_OUTGOING_MAIL_SUCCESS,
    payload: response
});

export const createDisposeOutgoingMailFail = error => ({
    type: CREATE_DISPOSE_OUTGOING_MAIL_FAIL,
    payload: error
});

