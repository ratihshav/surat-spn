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


//update
export const updateMasterGroupService = (request) => {

  const id = request.id
  const UPDATE_MASTER_GROUP_API = config.api_endpoint + `/unit/save/${id}`;
  const formData = new FormData();
  formData.append('id', id);

  return instance.post(UPDATE_MASTER_GROUP_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//delete
export const deleteMasterGroupService = (request) => {
  const id = request.id
  const DELETE_MASTER_GROUP_API_ENDPOINT = config.api_endpoint + `/unit/delete/${id}`;
  return instance.post(DELETE_MASTER_GROUP_API_ENDPOINT, id)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//detail
export const getDetailGroupService = (request) => {
  const GET_DETAIL_GROUP_API = config.api_endpoint + `/unit/view/${request}`;
  return instance.get(GET_DETAIL_GROUP_API)
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