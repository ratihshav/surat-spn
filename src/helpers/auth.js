import config from './config'

var token = window.localStorage.getItem('token');

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

export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = config.api_endpoint + '/login';
  const parameters = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  };
  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then(response => {

      return response.json();
    })
    .then(json => {
      const storedToken = json.token
      console.log('storedToken', storedToken)
      const setAuthUser = sessionStorage.setItem('authUser', JSON.stringify(storedToken))
      console.log('setAuthUser', setAuthUser)
      return json;
    })
    .catch(error => {
      return this._handleError(error);
    })
};

export const setLoggeedInUser = user => {
  sessionStorage.setItem("authUser", JSON.stringify(user));
};

/**
 * Returns the authenticated user
 */
export const getAuthenticatedUser = () => {

  return JSON.parse(sessionStorage.getItem("authUser"));

};

export async function _handleError(error) {
  // var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
};