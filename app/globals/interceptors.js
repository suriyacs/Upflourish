import axios from 'axios';
import ApiError from './ApiError';
import ERRORS from './errorConstants';
import storage from './localStorage';
import BaseURL from '../utils/BaseUrl';

// eslint-disable-next-line no-unused-vars
const setupInterceptors = store => {
  // Default settings for axios request
  axios.defaults.baseURL = BaseURL();
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.validateStatus = () => true;

  axios.interceptors.request.use(
    config => config
    , error => Promise.reject(error),
  );

  axios.interceptors.response.use(response => {
    if (response.status >= 500) {
      throw new ApiError(ERRORS.SERVER_ERROR, response.data.error.message);
    } else if (response.status === 401) {
      throw new ApiError(ERRORS.UNAUTHORISED_ERROR);
    } else if (response.status === 403) {
      throw new ApiError(ERRORS.FORBIDDEN_ERROR);
    } else if (response.status === 400) {
      throw new ApiError(ERRORS.UNAUTHORISED_ERROR, response.data.error.message);
    } else if (response.status === 404) {
      throw new ApiError(ERRORS.CLIENT_ERROR, response.data.error.message);
    } else if (response.status === 422) {
      throw new ApiError(ERRORS.VALIDATION_ERROR, response.data.error.message);
    } else if (response.status === 200 || response.status === 201 ||
      response.status === 202 || response.status === 204) {
      return response.data;
    } else {
      throw new ApiError(ERRORS.CLIENT_ERROR);
    }
  }, error => Promise.reject(error));
};

/**
 * Set auth token as default in axios
 * @param token
 */
export const setAuthToken = (token = storage.getItem('accessToken') ? storage.getItem('accessToken') : '') => {
  axios.defaults.headers.common.Authorization = token;
  axios.defaults.headers.common.tenant = process.env.TENANT_NAME;
};

setAuthToken();

export default setupInterceptors;
