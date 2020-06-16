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


export const registerUserService = (request) => {
  const REGISTER_API_ENDPOINT = config.api_endpoint;

  const parameters = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request.user)
  };

  return fetch(REGISTER_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

export const sanctumService = (request) => {
  const sanctum = config.endpoint + '/sanctum/csrf-cookie';
  const parameters = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };
  return fetch(sanctum, parameters)
    .then(response => {
      return loginUserService(request)
    })
    .catch(error => {
      return this._handleError(error);
    })
}

export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = config.api_endpoint + '/login';
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
};

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

export const setLoggeedInUser = user => {
  localStorage.setItem("authUser", JSON.stringify(user));
};



export async function _handleError(error) {
  // var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
};