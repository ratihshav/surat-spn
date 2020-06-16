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
  const GET_MASTER_GROUP_API = config.api_endpoint + `/unit/list`;
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
  const GET_MASTER_GROUP_API = config.api_endpoint + `/unit/list`;
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
  const formData = new FormData();
  formData.append('group_code', request.group_code);
  formData.append('group_name', request.group_name);

  const SAVE_MASTER_GROUP_API = config.api_endpoint + '/unit/save';
  return instance.post(SAVE_MASTER_GROUP_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

export const saveMasterUserService = (request) => {
  const formData = new FormData();
  formData.append('position_id', request.position_id);
  formData.append('username', request.username);
  formData.append('full_name', request.full_name);
  formData.append('nip', request.nip);
  formData.append('email', request.email);
  formData.append('ttl', request.ttl);
  formData.append('password', request.password);
  formData.append('phone', request.phone);
  formData.append('address', request.address);
  formData.append('jenis_kelamin', request.jenis_kelamin)

  const SAVE_MASTER_USER_API = config.api_endpoint + `/user/save`
  return instance.post(SAVE_MASTER_USER_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}

//update
export const updateMasterGroupService = (request) => {
  const id = request.id
  const UPDATE_MASTER_GROUP_API = config.api_endpoint + `/unit/save/${id}`;
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
  const DELETE_MASTER_GROUP_API_ENDPOINT = config.api_endpoint + `/unit/delete/${id}`;
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
  const GET_DETAIL_GROUP_API = config.api_endpoint + `/unit/view/${request}`;
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