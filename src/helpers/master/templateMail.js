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
export const getTemplateMailService = () => {
  const GET_TEMPLATE_MAIL_API = config.api_endpoint + `/templateSurat/list`;
  return instance.get(GET_TEMPLATE_MAIL_API)
    .then((data) => {
      return {
        data: data.data.data,
      };
    })
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
}


//create
export const createTemplateMailService = (request) => {
  const formData = new FormData();
  formData.append('template_type', request.template_type);
  formData.append('template_name', request.template_name);
  formData.append('file', request.file);

  console.log('request', request)
  const SAVE_TEMPLATE_MAIL_API = config.api_endpoint + '/templateSurat/save';
  return instance.post(SAVE_TEMPLATE_MAIL_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//update
export const updateTemplateMailService = (request) => {
  const id = window.localStorage.getItem('idTemp');
  const formData = new FormData();
  formData.append('position_name', request.position_name);
  formData.append('position_type', request.position_type);
  formData.append('group_name', request.group_name);
  formData.append('group_id', request.group_id);

  const UPDATE_TEMPLATE_MAIL_API = config.api_endpoint + `/templateSurat/save/${id}`;
  return instance.post(UPDATE_TEMPLATE_MAIL_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//delete
export const deleteTemplateMailService = (request) => {
  const id = request.id
  const DELETE_TEMPLATE_MAIL_API = config.api_endpoint + `/templateSurat/delete/${id}`;
  return instance.post(DELETE_TEMPLATE_MAIL_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//detail
export const getDetailTemplateMailService = (request) => {
  const id = window.localStorage.getItem('idTemp');

  const GET_DETAIL_TEMPLATE_MAIL_API = config.api_endpoint + `/templateSurat/view/${id}`;
  return instance.get(GET_DETAIL_TEMPLATE_MAIL_API)
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