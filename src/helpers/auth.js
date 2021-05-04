import config from './config'
import instance from "./axios";

const TOKEN_NAME = 'authUser'

/**
 * Returns the authenticated user
 */
export const getAuthenticatedUser = () => {
  return getToken(TOKEN_NAME)
};

// setTimeout(getAuthenticatedUser, 3000);

export const loginUserService = (request) => {
  const sanctum = config.endpoint + '/sanctum/csrf-cookie';
  const LOGIN_API_ENDPOINT = config.api_endpoint + '/login';

  return instance.get(sanctum)
    .then((data) => {
      return instance.post(LOGIN_API_ENDPOINT, request)
        .then((data) => {
          const storedToken = data.data.data.token
          const id = data.data.data.userid
          saveToken(storedToken)
          localStorage.setItem('id', JSON.stringify(id))
          return data.data.data
        })
        .catch((error) => { throw error.response.data.messages[0] });
    })
    .catch((error) => { throw error });
}

// save token with cookies
function saveToken(access_token) {
  document.cookie = `${TOKEN_NAME}=${access_token}`;
}

// remove all cookies with same the origin
export function removeToken() {
  const cookies = document.cookie.split(";");

  // delete cookies token
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

    document.cookie = `${name}=;Max-Age=0`;
  }
}

// just get token value
export function getToken() {
  const getCookie = document.cookie.split("; ").find((row) => row.startsWith(TOKEN_NAME));

  if (getCookie) return getCookie.split("=")[1];
  else return null;
}


export const checkUserSession = () => {
  const CHECK_USER_SESSION = config.api_endpoint + '/cekUser';

  return instance.get(CHECK_USER_SESSION)
    .then((data) => {
      return {
        data: data
      }
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
