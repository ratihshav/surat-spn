import axios from 'axios'
import config from './config'

var token = JSON.parse(window.localStorage.getItem('authUser'));
const CancelToken = axios.CancelToken;
let cancel;

const instance = axios.create({
  baseURL: config.api_endpoint,
  timeout: 20000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

/**
 * Returns the authenticated user
 */
export const getAuthenticatedUser = () => {
  if (!localStorage.getItem("authUser")) return null;
  return JSON.parse(localStorage.getItem("authUser"));
};

setTimeout(getAuthenticatedUser, 50);

export const loginUserService = (request) => {
  const sanctum = config.endpoint + '/sanctum/csrf-cookie';
  const LOGIN_API_ENDPOINT = config.api_endpoint + '/login';

  return instance.get(sanctum)
    .then((data) => {
      return instance.post(LOGIN_API_ENDPOINT, request)
        .then((data) => {
          const storedToken = data.data.data.token
          const id = data.data.data.userid
          localStorage.setItem('authUser', JSON.stringify(storedToken))
          localStorage.setItem('id', JSON.stringify(id))

          return {
            data: data.data.data
          }
        })
        .catch(() => { throw 'Gagal Login'; });
    })
    .catch(error => {
      return this._handleError(error);
    })
}



export const setLoggeedInUser = user => {
  localStorage.setItem("authUser", JSON.stringify(user));
};



export async function _handleError(error) {
  // var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
};