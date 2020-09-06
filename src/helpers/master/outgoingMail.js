import config from '../config'
import instance, { cancel } from "../axios";


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
  formData.append('sign_user_id', request.sign_user_id);
  formData.append('approval_user_id', request.approval_user_id);
  formData.append('file', request.file);

  const CREATE_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/save`
  return instance.post(CREATE_OUTGOING_MAIL_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
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
  formData.append('tujuan_user_id', request.tujuan_user_id);
  formData.append('file', request.file);
  formData.append('keterangan', request.keterangan);
  formData.append('approved', request.approved);

  const CREATE_DISPOSE_OUTGOING_MAIL_API = config.api_endpoint + `/suratKeluar/approve`
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
  formData.append('approved', request.approved);

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

export const verifyOutgoingMailService = (request) => {
  const id = request.id
  const formData = new FormData();
  formData.append('approved', request.approved);
  formData.append('to_user_id', request.to_user_id);
  formData.append('keterangan', request.keterangan);

  const VERIFY_OUT_MAIL_API = config.api_endpoint + `/suratKeluar/verify/${id}`;
  return instance.post(VERIFY_OUT_MAIL_API, formData)
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