import config from '../config'
import instance, { cancel } from "../axios";


//get list position directly
export const getMasterPositionServices = () => {
  const GET_MASTER_POSITION_API = config.api_endpoint + `/jabatan/list`;
  return instance.get(GET_MASTER_POSITION_API)
    .then((data) => {
      return {
        data: data.data.data,
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}


//create
export const saveMasterPositionService = (request) => {
  const formData = new FormData();
  formData.append('position_name', request.position_name);
  formData.append('position_type', request.position_type);
  formData.append('group_id', request.group_id);
  formData.append('detail', request.detail);
  formData.append('is_parent', request.is_parent);
  formData.append('parent_id', request.parent_id);

  const SAVE_MASTER_POSITION_API = config.api_endpoint + '/jabatan/save';
  return instance.post(SAVE_MASTER_POSITION_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//update
export const updateMasterPositionService = (request) => {
  const id = window.localStorage.getItem('idPosition');
  const formData = new FormData();
  formData.append('position_name', request.position_name);
  formData.append('position_type', request.position_type);
  formData.append('group_id', request.group_id);
  formData.append('detail', request.detail);
  formData.append('is_parent', request.is_parent);
  formData.append('parent_id', request.parent_id);

  const UPDATE_MASTER_POSITION_API = config.api_endpoint + `/jabatan/save/${id}`;
  return instance.post(UPDATE_MASTER_POSITION_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//delete
export const deleteMasterPositionService = (id) => {
  const DELETE_MASTER_POSITION_API = config.api_endpoint + `/jabatan/delete/${id}`;
  return instance.post(DELETE_MASTER_POSITION_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//detail
export const getDetailPositionService = (request) => {
  const id = window.localStorage.getItem('idPosition');

  const GET_DETAIL_POSITION_API = config.api_endpoint + `/jabatan/view/${id}`;
  return instance.get(GET_DETAIL_POSITION_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//get all permissions
export const getAllPermissionService = (request) => {
  const id = window.localStorage.getItem('idPosition');

  const GET_ALL_PERMISSION_API = config.api_endpoint + `/jabatan/permission/all`;
  return instance.get(GET_ALL_PERMISSION_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//get granted permissions
export const getGrantedPermissionService = (request) => {
  const id = window.localStorage.getItem('idPosition');

  const GET_GRANTED_PERMISSION_API = config.api_endpoint + `/jabatan/permission/granted/${id}`;
  return instance.get(GET_GRANTED_PERMISSION_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//get granted permissions
export const saveGrantedPermissionService = (request) => {
  const id = window.localStorage.getItem('idPosition');
  const formData = new FormData();
  formData.append('permissions', request);

  const SAVE_GRANTED_PERMISSION_API = config.api_endpoint + `/jabatan/permission/save/${id}`;
  return instance.post(SAVE_GRANTED_PERMISSION_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

export const searchParentPositionService = (request) => {

  const SEARCH_PAR_POSITION_API = config.api_endpoint + `/jabatan/searchParent`
  return instance.get(SEARCH_PAR_POSITION_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const searchPositionService = (request) => {

  const SEARCH_POSITION_API = config.api_endpoint + `/jabatan/search`
  return instance.get(SEARCH_POSITION_API)
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