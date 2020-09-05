import config from '../config'
import instance, { cancel } from "../axios";

//get list group directly
export const getMasterClassService = () => {
  const GET_MASTER_CLASS_API = config.api_endpoint + `/klasifikasi/list`;
  return instance.get(GET_MASTER_CLASS_API)
    .then((data) => {
      return {
        data: data.data.data,
      };
    })
    .catch(() => { throw 'Tidak Dapat Menampilkan Data'; });
}



//create
export const saveMasterClassService = (request) => {
  const formData = new FormData();
  formData.append('kode_klasifikasi', request.kode_klasifikasi);
  formData.append('nama_klasifikasi', request.nama_klasifikasi);
  formData.append('detail', request.detail);


  const SAVE_MASTER_CLASS_API = config.api_endpoint + '/klasifikasi/save';
  return instance.post(SAVE_MASTER_CLASS_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};


//update
export const updateMasterClassService = (request) => {

  const id = window.localStorage.getItem('idClass');
  const UPDATE_MASTER_CLASS_API = config.api_endpoint + `/klasifikasi/save/${id}`;
  const formData = new FormData();
  formData.append('kode_klasifikasi', request.kode_klasifikasi);
  formData.append('nama_klasifikasi', request.nama_klasifikasi);
  formData.append('detail', request.detail);

  return instance.post(UPDATE_MASTER_CLASS_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//delete
export const deleteMasterClassService = (request) => {
  const id = request.id
  const DELETE_MASTER_CLASS_API = config.api_endpoint + `/klasifikasi/delete/${id}`;
  return instance.post(DELETE_MASTER_CLASS_API, id)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

//detail
export const getDetailClassService = (request) => {
  const id = window.localStorage.getItem('idClass');

  const GET_DETAIL_CLASS_API = config.api_endpoint + `/klasifikasi/view/${id}`;
  return instance.get(GET_DETAIL_CLASS_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch(() => { throw 'Gagal Mengubah Data'; });
};

export const searchMasterClassService = (request) => {

  const SEARCH_MASTER_CLASS_API = config.api_endpoint + `/klasifikasi/search`;
  return instance.get(SEARCH_MASTER_CLASS_API)
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