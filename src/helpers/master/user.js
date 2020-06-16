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
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  },
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

//get list user directly
export const getMasterUserServices = (request) => {
  const GET_MASTER_USER_API = config.api_endpoint + `/user/list`;
  return instance.get(GET_MASTER_USER_API + `${request}`)
    .then((data) => {
      return {
        data: data.data.data.data,
        totalCount: data.data.data.totalCount
      };
    })
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
}


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
export const updateMasterUserService = (request) => {
  const id = request.id
  const UPDATE_MASTER_USER_API = config.api_endpoint + `/user/save/x`;
  const formData = new FormData();
  formData.append('id', id);

  return instance.post(UPDATE_MASTER_USER_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}

//delete
export const deleteMasterUserService = (request) => {
  const id = request.id
  const DELETE_MASTER_USER_API_ENDPOINT = config.api_endpoint + `/user/delete/${id}`;
  const parameters = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  };
  return fetch(DELETE_MASTER_USER_API_ENDPOINT, parameters)
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
export const getDetailUserService = (request) => {
  // const id = request.id
  const GET_DETAIL_USER_API = config.api_endpoint + `/user/view/${request}`;
  const parameters = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    // body: JSON.stringify(request)
  };
  return fetch(GET_DETAIL_USER_API, parameters)
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

export const changePasswordUserService = (request) => {
  const id = request.id
  const password = request.password
  const formData = new FormData();
  formData.append('password', password);

  const CHANGE_PASSWORD_USER_API = config.api_endpoint + `/user/changePassword/${id}`
  return instance.post(CHANGE_PASSWORD_USER_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}


export const changePhotoUserService = (request) => {
  const id = request.id
  const file = request.image[0]
  const formData = new FormData();
  formData.append('file', file);

  const CHANGE_PHOTO_USER_API = config.api_endpoint + `/user/uploadPhoto/${id}`
  return instance.post(CHANGE_PHOTO_USER_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}



export async function _handleError(error) {
  // var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
};

export default {
  fetch: instance,
  cancel,
}