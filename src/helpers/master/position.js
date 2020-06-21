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

//get list position directly
export const getMasterPositionServices = () => {
  const GET_MASTER_POSITION_API = config.api_endpoint + `/jabatan/list`;
  return instance.get(GET_MASTER_POSITION_API)
    .then((data) => {
      return {
        data: data.data.data.data,
      };
    })
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
}


//create
export const saveMasterPositionService = (request) => {
  const formData = new FormData();
  formData.append('position_name', request.position_name);
  formData.append('position_type', request.position_type);
  formData.append('group_name', request.group_name);
  formData.append('group_id', request.group_id);

  const SAVE_MASTER_POSITION_API = config.api_endpoint + '/jabatan/save';
  return instance.post(SAVE_MASTER_POSITION_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//update
export const updateMasterPositionService = (request) => {
  const id = window.localStorage.getItem('idPosition');
  const formData = new FormData();
  formData.append('position_name', request.position_name);
  formData.append('position_type', request.position_type);
  formData.append('group_name', request.group_name);
  formData.append('group_id', request.group_id);

  const UPDATE_MASTER_POSITION_API = config.api_endpoint + `/jabatan/save/${id}`;
  return instance.post(UPDATE_MASTER_POSITION_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//delete
export const deleteMasterPositionService = (request) => {
  const id = request.id
  const DELETE_MASTER_POSITION_API = config.api_endpoint + `/jabatan/delete/${id}`;
  return instance.post(DELETE_MASTER_POSITION_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//detail
export const getDetailPositionService = (request) => {
  const id = window.localStorage.getItem('idPosition');

  const GET_DETAIL_POSITION_API = config.api_endpoint + `/jabatan/view/${id}`;
  return instance.get(GET_DETAIL_POSITION_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
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