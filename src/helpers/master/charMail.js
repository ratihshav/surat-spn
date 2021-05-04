import config from '../config'
import instance, { cancel } from "../axios";

//get list group directly
export const getMasterCharMailService = () => {
  const GET_MASTER_CHAR_MAIL_SERVICE = config.api_endpoint + `/sifatSurat/list`;
  return instance.get(GET_MASTER_CHAR_MAIL_SERVICE)
    .then((data) => {
      return {
        data: data.data.data,
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}



//create
export const saveMasterCharMailService = (request) => {
  const formData = new FormData();
  formData.append('sifat_surat', request.sifat_surat);

  const SAVE_MASTER_CHAR_MAIL_SERVICE = config.api_endpoint + '/sifatSurat/save';
  return instance.post(SAVE_MASTER_CHAR_MAIL_SERVICE, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};


//delete
export const deleteMasterCharMailService = (id) => {
  const DELETE_MASTER_CHAR_MAIL_SERVICE = config.api_endpoint + `/sifatSurat/delete/${id}`;
  return instance.post(DELETE_MASTER_CHAR_MAIL_SERVICE, id)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};


export const searchMasterCharMailService = (request) => {

  const SEARCH_MASTER_CHAR_MAIL_API = config.api_endpoint + `/sifatSurat/search`;
  return instance.get(SEARCH_MASTER_CHAR_MAIL_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });

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