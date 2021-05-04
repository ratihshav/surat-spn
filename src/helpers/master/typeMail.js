import config from '../config'
import instance, { cancel } from "../axios";

//get list group directly
export const getMasterTypeMailService = () => {
  const GET_MASTER_TYPE_MAIL_SERVICE = config.api_endpoint + `/tipeSurat/list`;
  return instance.get(GET_MASTER_TYPE_MAIL_SERVICE)
    .then((data) => {
      return {
        data: data.data.data,
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}



//create
export const saveMasterTypeMailService = (request) => {
  const formData = new FormData();
  formData.append('tipe_surat', request.tipe_surat);

  const SAVE_MASTER_TYPE_MAIL_SERVICE = config.api_endpoint + '/tipeSurat/save';
  return instance.post(SAVE_MASTER_TYPE_MAIL_SERVICE, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};


//delete
export const deleteMasterTypeMailService = (id) => {
  const DELETE_MASTER_TYPE_MAIL_SERVICE = config.api_endpoint + `/tipeSurat/delete/${id}`;
  return instance.post(DELETE_MASTER_TYPE_MAIL_SERVICE, id)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};


export const searchMasterTypeMailService = (request) => {

  const SEARCH_MASTER_TYPE_MAIL_API = config.api_endpoint + `/tipeSurat/search`;
  return instance.get(SEARCH_MASTER_TYPE_MAIL_API)
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