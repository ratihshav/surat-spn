import config from '../config'
import instance, { cancel } from "../axios";

//get list user directly
export const getMasterUserServices = (request) => {
  const GET_MASTER_USER_API = config.api_endpoint + `/user/list`;
  return instance.get(GET_MASTER_USER_API + `${request}`)
    .then((data) => {
      return {
        data: data.data.data.data,
        totalCount: data.data.data.totalCount
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}


export const saveMasterUserService = (request) => {
  const formData = new FormData();
  formData.append('position_id', request.position_id);
  formData.append('username', request.username);
  formData.append('full_name', request.full_name);
  formData.append('nip', request.nip);
  formData.append('email', request.email);
  formData.append('ttl', request.ttl);
  formData.append('password', request.password);
  formData.append('phone', request.phone);
  formData.append('address', request.address);
  formData.append('jenis_kelamin', request.jenis_kelamin)

  const SAVE_MASTER_USER_API = config.api_endpoint + `/user/save`
  return instance.post(SAVE_MASTER_USER_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

//update
export const updateMasterUserService = (request) => {
  const id = request.isFromEditUser ? window.localStorage.getItem('idUser') : request.idProfile;
  const formData = new FormData();
  formData.append('position_id', request.position_id);
  formData.append('username', request.username);
  formData.append('full_name', request.full_name);
  formData.append('nip', request.nip);
  formData.append('email', request.email);
  formData.append('ttl', request.ttl);
  formData.append('phone', request.phone);
  formData.append('address', request.address);
  formData.append('jenis_kelamin', request.jenis_kelamin)

  const UPDATE_MASTER_USER_API = config.api_endpoint + `/user/save/${id}`;

  return instance.post(UPDATE_MASTER_USER_API, formData)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

//delete
export const deleteMasterUserService = (request) => {
  const id = request.id
  const DELETE_MASTER_USER_API_ENDPOINT = config.api_endpoint + `/user/delete/${id}`;
  return instance.post(DELETE_MASTER_USER_API_ENDPOINT, id)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

//detail
export const getDetailUserService = (request) => {
  const GET_DETAIL_USER_API = config.api_endpoint + `/user/view/${request}`;
  return instance.get(GET_DETAIL_USER_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

export const changePasswordUserService = (request) => {
  const id = request.id;
  const password = request.password
  const formData = new FormData();
  formData.append('password', password);

  const CHANGE_PASSWORD_USER_API = config.api_endpoint + `/user/changePassword/${id}`
  return instance.post(CHANGE_PASSWORD_USER_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}


export const changePhotoUserService = (request) => {
  const id = request.id;
  const file = request.image[0]
  const formData = new FormData();
  formData.append('file', file);

  const CHANGE_PHOTO_USER_API = config.api_endpoint + `/user/uploadPhoto/${id}`
  return instance.post(CHANGE_PHOTO_USER_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const searchUserService = (request) => {

  const SEARCH_USER_API = config.api_endpoint + `/user/search`
  return instance.get(SEARCH_USER_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const searchUserTtdService = (request) => {

  const SEARCH_USER_TTD_API = config.api_endpoint + `/user/searchTtd`
  return instance.get(SEARCH_USER_TTD_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const searchUserSKService = (request) => {

  const SEARCH_USER_SK_API = config.api_endpoint + `/user/searchSK`
  return instance.get(SEARCH_USER_SK_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const searchUserSMService = (request) => {

  const SEARCH_USER_SM_API = config.api_endpoint + `/user/searchSM`
  return instance.get(SEARCH_USER_SM_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}


export const logoutUserService = (request) => {
  const LOGOUT_USER_API = config.api_endpoint + `/logout`
  return instance.post(LOGOUT_USER_API)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const forgetPasswordService = (request) => {
  const FORGET_PASSWORD_API = config.api_endpoint + '/forgotPassword'
  return instance.post(FORGET_PASSWORD_API, request)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const resetPasswordService = (request) => {
  const id = window.localStorage.getItem('idUser');
  const formData = new FormData();
  formData.append('email', request.email);
  formData.append('konci_pas', request.konci_pas);
  formData.append('new_password', request.password);

  const RESET_PASSWORD_API = config.api_endpoint + '/resetPassword'
  return instance.post(RESET_PASSWORD_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const saveSignatureUserService = (request) => {
  const id = request.id;
  const formData = new FormData();
  formData.append('file', request.file, 'signature.png');

  const SAVE_SIGNATURE_API = config.api_endpoint + `/user/savettd/${id}`
  return instance.post(SAVE_SIGNATURE_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const getNotifService = (request) => {

  const GET_NOTIF_API = config.api_endpoint + `/notif/topbar/view`
  return instance.get(GET_NOTIF_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export const getNotifCountService = (request) => {

  const GET_NOTIF_COUNT_API = config.api_endpoint + `/notif/topbar/count`
  return instance.get(GET_NOTIF_COUNT_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}
export const getNotifReadService = (request) => {

  const GET_NOTIF_READ_API = config.api_endpoint + `/notif/read/${request}`
  return instance.post(GET_NOTIF_READ_API)
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
  // cancel,
}
