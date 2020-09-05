import config from '../config'
import instance, { cancel } from "../axios";

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