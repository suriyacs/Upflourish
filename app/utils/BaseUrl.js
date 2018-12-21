const BaseURL = () => {
  const { API_PROTOCOL, API_HOST, API_PORT } = process.env;
  let baseURL = '/api';
  if (API_PROTOCOL && API_HOST) {
    baseURL = `${API_PROTOCOL}${API_HOST}${API_PORT ? `:${API_PORT}` : ''}${baseURL}`;
  }
  return baseURL;
};

export default BaseURL;
