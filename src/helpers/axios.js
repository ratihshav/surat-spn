import axios from 'axios'
import { getToken, removeToken } from "./auth";
import config from './config'
import { logoutUserService } from '../helpers/master/user'

const CancelToken = axios.CancelToken;
export let cancel;

const instance = axios.create({
  baseURL: config.api_endpoint,
  timeout: 20000,
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

instance.interceptors.request.use((config) => {
  const token = getToken()
  config.headers.authorization = `Bearer ${token}`;
  config.headers.accept = 'application/json'
  config.headers['Content-Type'] = 'application/json'

  return config;
});

// instance.interceptors.response.use(
//   (response) => { return response },
//   (error) => { return Promise.reject(error); }
// );

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    logoutUserService()
      .then((data) => {
        removeToken()
        window.localStorage.clear()
        window.location = '/'
      })
      .catch((e) => { throw e.response.messages[0] });
  } else {
    return Promise.reject(error);
  }
});

export default instance
