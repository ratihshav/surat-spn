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
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  },
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

//get validate mail
export const getValidatedMailService = (request) => {
  const GET_VALIDATE_MAIL_API = config.api_endpoint + `/cekSurat?key=${request}`;
  return instance.get(GET_VALIDATE_MAIL_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((error) => { throw error.response.data.messages[0] });
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