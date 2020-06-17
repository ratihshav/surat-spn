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

export const getIncomingMailService = (request) => {
  const req = request ? request : ''
  const GET_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/list`;
  return instance.get(GET_INCOMING_MAIL_API + `${req}`)
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
  formData.append('asal_surat', request.asal_surat);
  formData.append('perihal', request.perihal);
  formData.append('nomor_surat', request.nomor_surat);
  formData.append('tgl_surat', request.tgl_surat);
  formData.append('lampiran', request.lampiran);
  formData.append('sifat_surat', request.sifat_surat);
  formData.append('klasifikasi', request.klasifikasi);
  formData.append('prioritas', request.prioritas);
  formData.append('keterangan', request.keterangan);
  formData.append('file', request.file);

  const CREATE_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/save`
  return instance.post(CREATE_INCOMING_MAIL_API, formData)
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
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
}

export const getDetailIncomingMailService = (request) => {

  const id = request
  const GET_DETAIL_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/view/${id}`
  return instance.get(GET_DETAIL_INCOMING_MAIL_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
}

export const createDisposeIncomingMailService = (request) => {
  const formData = new FormData();
  formData.append('surat_masuk_id', request.surat_keluar_id);
  formData.append('to_user_id', request.to_user_id);
  formData.append('arahan', request.arahan);
  // formData.append('is_tembusan', request.is_tembusan);
  // formData.append('is_private', request.is_private);
  formData.append('file', request.file);
  formData.append('keterangan', request.keterangan);

  const CREATE_DISPOSE_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/disposisi`
  return instance.post(CREATE_DISPOSE_INCOMING_MAIL_API, formData)
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