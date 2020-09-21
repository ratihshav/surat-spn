import config from '../config'
import instance, { cancel } from "../axios";

export const getDetailProfileService = (request) => {
  const GET_DETAIL_USER_API = config.api_endpoint + `/profile/view/${request}`;
  return instance.get(GET_DETAIL_USER_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
};

export const updateMasterProfileService = (request) => {
  const id = request.id;
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

export const changePasswordProfileService = (request) => {
  const id = request.id;
  const password = request.password
  const formData = new FormData();
  formData.append('password', password);

  const CHANGE_PASSWORD_USER_API = config.api_endpoint + `/profile/changePassword/${id}`
  return instance.post(CHANGE_PASSWORD_USER_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}


export const changePhotoProfileService = (request) => {
  const id = request.id;
  const file = request.image[0]
  const formData = new FormData();
  formData.append('file', file);

  const CHANGE_PHOTO_USER_API = config.api_endpoint + `/profile/uploadPhoto/${id}`
  return instance.post(CHANGE_PHOTO_USER_API, formData)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}

export default {
  fetch: instance,
  // cancel,
}