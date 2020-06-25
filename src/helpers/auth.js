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


export const logoutUserService = (request) => {
  const LOGOUT_USER_API = config.api_endpoint + `/logout`
  return instance.post(LOGOUT_USER_API)
    .then((data) => {
      return {
        data: data.data
      };
    })
    .catch((error) => { console.log('error', error) });
}

export const forgetPasswordService = (request) => {
  const FORGET_PASSWORD_API = config.api_endpoint + '/forgotPassword'
  return instance.post(FORGET_PASSWORD_API, request)
    .then((data) => {
      return {
        data: data
      };
    })
    .catch((error) => { throw 'Gagal'; });
}

export const resetPasswordService = (request) => {
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
    .catch((error) => { throw 'Gagal'; });
}

export const setLoggeedInUser = user => {
  localStorage.setItem("authUser", JSON.stringify(user));
};



export async function _handleError(error) {
  // var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
};