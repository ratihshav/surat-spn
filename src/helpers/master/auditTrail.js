import config from '../config'
import instance, { cancel } from "../axios";

//get list group directly
export const getAuditTrailService = (request) => {
  const GET_AUDIT_TRAIL_SERVICE = config.api_endpoint + `/auditTrail/list`;
  const req = `?page=${request.page}&per_page=${request.perPage}`
  return instance.get(GET_AUDIT_TRAIL_SERVICE + `${req}`)
    .then((data) => {
      return {
        data: data.data.data,
        totalCount: data.data.data ? data.data.data.total : null
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