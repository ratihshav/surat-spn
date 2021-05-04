import axios from 'axios'
import { getToken, removeToken } from "./auth";
import config from './config'
import { logoutUserService } from '../helpers/master/user'
import toast from '../pages/UI/toast';

const CancelToken = axios.CancelToken;
export let cancel;

const instance = axios.create({
  baseURL: config.api_endpoint,
  timeout: 20000,
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

function alertError(e) {
  toast.error(e)
}


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

instance.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    logoutUserService()
      .then((data) => {
        this.alertError(data)
        removeToken()
        window.localStorage.clear()
        window.location = '/'
      })
      .catch((e) => {
        removeToken()
        window.localStorage.clear()
        window.location = '/'
      });
  } else {
    return Promise.reject(error);
  }
});

export default instance
