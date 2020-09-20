import config from '../config'
import instance, { cancel } from "../axios";

//get list group directly
export const getMasterGroupServices = () => {
  const GET_MASTER_GROUP_API = config.api_endpoint + `/unit/list`;
  return instance.get(GET_MASTER_GROUP_API)
    .then((data) => {
      return {
        data: data.data.data,
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
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
    .catch((e) => { throw e.response.data.messages[0] });
};


//update
export const updateMasterGroupService = (request) => {

  const id = window.localStorage.getItem('idDivisi');
  const UPDATE_MASTER_GROUP_API = config.api_endpoint + `/unit/save/${id}`;
  const formData = new FormData();
  formData.append('group_code', request.group_code);
  formData.append('group_name', request.group_name)

  return instance.post(UPDATE_MASTER_GROUP_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//delete
export const deleteMasterGroupService = (id) => {
  const DELETE_MASTER_GROUP_API = config.api_endpoint + `/unit/delete/${id}`;
  return instance.post(DELETE_MASTER_GROUP_API, id)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//detail
export const getDetailGroupService = (request) => {
  const id = window.localStorage.getItem('idDivisi');

  const GET_DETAIL_GROUP_API = config.api_endpoint + `/unit/view/${id}`;
  return instance.get(GET_DETAIL_GROUP_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

export const searchGroupService = (request) => {

  const SEARCH_GROUP_API = config.api_endpoint + `/unit/search`
  return instance.get(SEARCH_GROUP_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
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