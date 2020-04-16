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
      const storedToken = json.data.token
      localStorage.setItem('authUser', JSON.stringify(storedToken))
      return json;
    })
    .catch(error => {
      return this._handleError(error);
    })
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

export const setLoggeedInUser = user => {
  localStorage.setItem("authUser", JSON.stringify(user));
};

/**
 * Returns the authenticated user
 */
export const getAuthenticatedUser = () => {
  if (!localStorage.getItem("authUser")) return null;
  return JSON.parse(localStorage.getItem("authUser"));
};

export async function _handleError(error) {
  // var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
};