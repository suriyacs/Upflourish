const ImageURL = (entity, image) => {
  const { API_PROTOCOL, API_HOST, API_PORT } = process.env;
  let imageURL = `/api/${entity}/${image}/thumbnail?q=${new Date().getTime()}`;

  if (image && image.includes('s3.amazonaws.com')) {
    return `${image}`;
  }
  if (API_PROTOCOL && API_HOST) {
    imageURL = `${API_PROTOCOL}${API_HOST}${API_PORT ? `:${API_PORT}` : ''}${imageURL}`;
  }
  return `${imageURL}`;
};

export default ImageURL;
