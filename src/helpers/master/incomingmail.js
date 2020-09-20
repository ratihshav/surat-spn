import config from '../config'
import instance, { cancel } from "../axios";

export const getIncomingMailService = () => {
  const GET_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/list`;
  const request = `?skip=0&take=10`
  return instance.get(GET_INCOMING_MAIL_API + `${request}`)
    .then((data) => {
      return {
        data: data.data.data.data,
        totalCount: data.data.data ? data.data.data.totalCount : null
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const createIncomingMailService = (request) => {
  const formData = new FormData();
  formData.append('asal_surat', request.asal_surat);
  formData.append('perihal', request.perihal);
  formData.append('nomor_surat', request.nomor_surat);
  formData.append('tgl_surat', request.tgl_surat);
  formData.append('lampiran', request.lampiran);
  formData.append('to_user_id', request.to_user_id);
  formData.append('sifat_surat', request.sifat_surat);
  formData.append('klasifikasi_id', request.klasifikasi_id);
  // formData.append('prioritas', request.prioritas);
  formData.append('keterangan', request.keterangan);
  formData.append('file', request.file);

  const CREATE_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/save`
  return instance.post(CREATE_INCOMING_MAIL_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const updateIncomingMailService = (request) => {
  const id = window.localStorage.getItem('idInMail');

  const formData = new FormData();
  formData.append('asal_surat', request.asal_surat);
  formData.append('perihal', request.perihal);
  formData.append('nomor_surat', request.nomor_surat);
  formData.append('tgl_surat', request.tgl_surat);
  formData.append('lampiran', request.lampiran);
  formData.append('to_user_id', request.to_user_id);
  formData.append('sifat_surat', request.sifat_surat);
  formData.append('klasifikasi_id', request.klasifikasi_id);
  // formData.append('prioritas', request.prioritas);
  formData.append('keterangan', request.keterangan);
  formData.append('file', request.file);

  const CREATE_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/save/${id}`
  return instance.post(CREATE_INCOMING_MAIL_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const getDetailIncomingMailService = (request) => {

  const GET_DETAIL_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/view/${request}`
  return instance.get(GET_DETAIL_INCOMING_MAIL_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const createDisposeIncomingMailService = (request) => {
  const to_user_id = request.to_user_id
  const formData = new FormData();
  formData.append('surat_masuk_id', request.surat_masuk_id);
  to_user_id.map((to_user_id, index) => {
    formData.append(`to_user_id[${index}]`, to_user_id);
  });
  formData.append('arahan', request.arahan);

  const CREATE_DISPOSE_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/disposisi`
  return instance.post(CREATE_DISPOSE_INCOMING_MAIL_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const deleteIncomingMailService = (id) => {
  const DELETE_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/delete/${id}`;
  return instance.post(DELETE_INCOMING_MAIL_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

export const readIncomingMailService = (request) => {
  const READ_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/read/${request}`;
  return instance.post(READ_INCOMING_MAIL_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

export const closeIncomingMailService = (request) => {
  const CLOSE_INCOMING_MAIL_API = config.api_endpoint + `/suratMasuk/close/${request}`;
  return instance.post(CLOSE_INCOMING_MAIL_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};




export default {
  fetch: instance,
  cancel,
}