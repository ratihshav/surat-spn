import axios from 'axios'
import config from '../config'
import { getAuthenticatedUser } from "../auth";

var token = getAuthenticatedUser()
const CancelToken = axios.CancelToken;
let cancel;

const instance = axios.create({
  baseURL: config.api_endpoint,
  timeout: 20000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

//get list group directly
export const getMasterGroupServices = () => {
  const GET_MASTER_GROUP_API = config.api_endpoint + `/jabatan/list`;
  return instance.get(GET_MASTER_GROUP_API)
    .then((data) => {
      return {
        data: data.data.data,
      };
    })
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
}

//get group for Saga
export const getMasterGroupService = () => {
  const GET_MASTER_GROUP_API = config.api_endpoint + `/jabatan/list`;
  const parameters = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    // body: JSON.stringify(request)
  };
  return fetch(GET_MASTER_GROUP_API, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return {
        data: json.data,
        // totalCount: json.data.totalCount
      };
    })
    .catch(error => {
      return error.message
    })
};


//create
export const saveMasterGroupService = (request) => {
  const SAVE_MASTER_GROUP_API = config.api_endpoint + '/jabatan/save';
  const parameters = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  };
  return fetch(SAVE_MASTER_GROUP_API, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      return this._handleError(error);
    })
};

//update
export const updateMasterGroupService = (request) => {
  const id = request.id
  const UPDATE_MASTER_GROUP_API = config.api_endpoint + `/jabatan/save/${id}`;
  const parameters = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  };
  return fetch(UPDATE_MASTER_GROUP_API, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      return this._handleError(error);
    })
};

//delete
export const deleteMasterGroupService = (request) => {
  const id = request.id
  const DELETE_MASTER_GROUP_API_ENDPOINT = config.api_endpoint + `/jabatan/delete/${id}`;
  const parameters = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  };
  return fetch(DELETE_MASTER_GROUP_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      return this._handleError(error);
    })
};

//detail
export const getDetailGroupService = (request) => {
  // const id = request.id
  const GET_DETAIL_GROUP_API = config.api_endpoint + `/jabatan/view/${request}`;
  const parameters = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    // body: JSON.stringify(request)
  };
  return fetch(GET_DETAIL_GROUP_API, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      return error.message
    })
};


export async function _handleError(error) {
  // var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
};

export default {
  fetch: instance,
  cancel,
}