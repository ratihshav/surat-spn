import axios from 'axios'
import config from './config'

var token = window.localStorage.getItem('authUser');
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
  // if (!localStorage.getItem("authUser")) return null;

  return (
    console.log('getAuth', localStorage.getItem("authUser")),
    localStorage.getItem("authUser"))
};

// setTimeout(getAuthenticatedUser, 3000);

export const loginUserService = (request) => {
  const sanctum = config.endpoint + '/sanctum/csrf-cookie';
  const LOGIN_API_ENDPOINT = config.api_endpoint + '/login';

  return instance.get(sanctum)
    .then((data) => {
      return instance.post(LOGIN_API_ENDPOINT, request)
        .then((data) => {
          console.log('data', data.data.data)
          const storedToken = data.data.data.token
          const id = data.data.data.userid
          localStorage.setItem('authUser', storedToken)
          localStorage.setItem('id', JSON.stringify(id))
          return data.data.data
        })
        .catch((error) => { throw error.response.data.messages[0] });
    })
    .catch((error) => { throw error });
}



export const setLoggeedInUser = user => {
  localStorage.setItem("authUser", JSON.stringify(user));
};



export async function _handleError(error) {
  // var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
};