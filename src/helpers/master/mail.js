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

export const getOutgoingMailService = (request) => {
  const req = request ? request : ''
  const GET_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/list`;
  return instance.get(GET_OUTGOING_MAIL_API + `${req}`)
    .then((data) => {
      return {
        data: data.data.data.data,
        totalCount: data.data.data.totalCount
      };
    })
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
}


export const createOutgoingMailService = (request) => {
  const formData = new FormData();
  formData.append('jenis_surat', request.jenis_surat);
  formData.append('klasifikasi_surat', request.klasifikasi_surat);
  formData.append('sifat_surat', request.sifat_surat);
  formData.append('tujuan_surat', request.tujuan_surat);
  formData.append('hal_surat', request.hal_surat);
  formData.append('lampiran_surat', request.lampiran_surat);
  formData.append('approval_user', request.approval_user);
  formData.append('to_user', request.to_user);
  formData.append('file', request.file);

  const CREATE_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/save`
  return instance.post(CREATE_OUTGOING_MAIL_API, formData)
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

export const getDetailOutgoingMailService = (request) => {

  const id = request
  const GET_DETAIL_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/view/${id}`
  return instance.get(GET_DETAIL_OUTGOING_MAIL_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}

export const createDisposeOutgoingMailService = (request) => {
  const formData = new FormData();
  formData.append('surat_keluar_id', request.surat_keluar_id);
  formData.append('tujuan_user', request.tujuan_user);
  formData.append('file', request.file);
  formData.append('keterangan', request.keterangan);

  const CREATE_DISPOSE_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/disposisi`
  return instance.post(CREATE_DISPOSE_OUTGOING_MAIL_API, formData)
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