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
  const GET_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/list`;
  return instance.get(GET_OUTGOING_MAIL_API + `${request}`)
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
  formData.append('klasifikasi_id', request.klasifikasi_id);
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


export const updateOutgoingMailService = (request) => {
  const id = window.localStorage.getItem('idOutMail');
  const formData = new FormData();
  formData.append('jenis_surat', request.jenis_surat);
  formData.append('klasifikasi_id', request.klasifikasi_id);
  formData.append('sifat_surat', request.sifat_surat);
  formData.append('tujuan_surat', request.tujuan_surat);
  formData.append('hal_surat', request.hal_surat);
  formData.append('lampiran_surat', request.lampiran_surat);
  formData.append('approval_user', request.approval_user);
  formData.append('to_user', request.to_user);
  formData.append('file', request.file);

  const UPDATE_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/save/${id}`
  return instance.post(UPDATE_OUTGOING_MAIL_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}

export const getDetailOutgoingMailService = (request) => {

  const GET_DETAIL_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/view/${request}`
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
  formData.append('is_approved', request.is_approved);

  const CREATE_DISPOSE_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/disposisi`
  return instance.post(CREATE_DISPOSE_OUTGOING_MAIL_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}

export const deleteOutgoingMailService = (request) => {
  const id = request.id
  const DELETE_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/delete/${id}`;
  return instance.post(DELETE_OUTGOING_MAIL_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

export const readOutgoingMailService = (request) => {
  const READ_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/read/${request}`;
  return instance.post(READ_OUTGOING_MAIL_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

export const createAgendaOutgoingMailService = (request) => {
  const id = request.id
  const formData = new FormData();
  formData.append('nomor_surat', request.nomor_surat);
  formData.append('nomor_agenda', request.nomor_agenda);
  formData.append('tgl_surat', request.tgl_surat);
  formData.append('file', request.file);

  const CREATE_AGENDA_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/agenda/${id}`
  return instance.post(CREATE_AGENDA_OUTGOING_MAIL_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
}

export const approveOutgoingMailService = (request) => {
  const id = request.id
  const formData = new FormData();
  formData.append('keterangan', request.keterangan);

  const APPROVE_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/sign/${id}`;
  return instance.post(APPROVE_OUTGOING_MAIL_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((error) => {
      throw 'Gagal Mengubah Data';
    });
};

export const generateNumMailService = (request) => {
  const id = request.id
  const formData = new FormData();
  formData.append('tgl_teks', request.tgl_teks);
  formData.append('tgl_agenda', request.tgl_agenda);

  const GENERATE_NUM_MAIL_API = config.api_endpoint + `/suratKeluar/generate/${id}`;
  return instance.post(GENERATE_NUM_MAIL_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((error) => {
      throw 'Gagal Mengubah Data';
    });
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