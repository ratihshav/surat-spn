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
  const id = window.localStorage.getItem('idUser');
  const formData = new FormData();
  formData.append('position_id', request.position_id);
  formData.append('username', request.username);
  formData.append('full_name', request.full_name);
  formData.append('nip', request.nip);
  formData.append('email', request.email);
  formData.append('ttl', request.ttl);
  formData.append('phone', request.phone);
  formData.append('address', request.address);
  formData.append('jenis_kelamin', request.jenis_kelamin)

  const UPDATE_MASTER_USER_API = config.api_endpoint + `/user/save/${id}`;

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
  return instance.post(DELETE_MASTER_USER_API_ENDPOINT, id)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//detail
export const getDetailUserService = (request) => {
  const GET_DETAIL_USER_API = config.api_endpoint + `/user/view/${request}`;
  return instance.get(GET_DETAIL_USER_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; })
};

export const changePasswordUserService = (request) => {
  const id = window.localStorage.getItem('idUser');
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
  const id = window.localStorage.getItem('idUser');
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

export const searchUserService = (request) => {

  const SEARCH_USER_API = config.api_endpoint + `/user/search`
  return instance.get(SEARCH_USER_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}

export const searchUserSKService = (request) => {

  const SEARCH_USER_SK_API = config.api_endpoint + `/user/searchSK`
  return instance.get(SEARCH_USER_SK_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}

export const searchUserSMService = (request) => {

  const SEARCH_USER_SM_API = config.api_endpoint + `/user/searchSM`
  return instance.get(SEARCH_USER_SM_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}


export const logoutUserService = (request) => {
  const LOGOUT_USER_API = config.api_endpoint + `/logout`
  return instance.post(LOGOUT_USER_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((error) => { console.log('error', error) });
}

export const forgetPasswordService = (request) => {
  const FORGET_PASSWORD_API = config.api_endpoint + '/forgotPassword'
  return instance.post(FORGET_PASSWORD_API, request)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((error) => { throw 'Gagal'; });
}

export const resetPasswordService = (request) => {
  const formData = new FormData();
  formData.append('email', request.email);
  formData.append('konci_pas', request.konci_pas);
  formData.append('new_password', request.password);

  const RESET_PASSWORD_API = config.api_endpoint + '/resetPassword'
  return instance.post(RESET_PASSWORD_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((error) => { throw 'Gagal'; });
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