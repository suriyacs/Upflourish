import CryptoJS from 'crypto-js';
import JSON from 'json3';

const getYTVideoId = url => {
  if (url && url.indexOf('www.youtube.com') !== -1) {
    const reg = new RegExp('[?&]v=([^&#]*)', 'i');
    const string = reg.exec(url);
    const videoId = string ? string[1] : null;
    return videoId;
  }
};
const getYTPlayListId = link => {
  if (link && link.indexOf('www.youtube.com') !== -1) {
    const reg = new RegExp('[&]list=([^&#]*)', 'i');
    const string = reg.exec(link);
    const playListId = string ? string[1] : null;
    return playListId;
  }
};

const encryptDisqusUserObject = disqusData => {
  const timestamp = Math.round(+new Date() / 1000);
  const message = Buffer.from(JSON.stringify(disqusData)).toString('base64');
  const result = CryptoJS.HmacSHA1(`${message}${' '}${timestamp}`, process.env.SECRET_KEY);
  const hexsig = CryptoJS.enc.Hex.stringify(result);
  return {
    pubKey: process.env.PUB_KEY,
    auth: `${message}${' '}${hexsig}${' '}${timestamp}`
  };
};

const getDisqusConfig = (encryptedData, match) =>
  function call() {
    this.page.identifier = `${match.params.pathId}-${match.params.sectionId}-${match.params.contentId}}`;
    this.page.url = window.location.href;
    this.page.remote_auth_s3 = encryptedData.auth;
    this.page.api_key = encryptedData.pubKey;
  };

const loadDisqus = props => {
  const doc = document;
  const encryptedData = encryptDisqusUserObject({
    id: props.userDetails.learner.id,
    username: props.userDetails.first_name,
    email: props.userDetails.email
  });
  window.disqus_config = getDisqusConfig(encryptedData, props.match);
  const scriptElement = doc.createElement('script');
  scriptElement.src = `${process.env.DISQUS_URL}`;
  scriptElement.setAttribute('data-timestamp', +new Date());
  (doc.head || doc.body).appendChild(scriptElement);
};

const getStateFromStore = (state, reducerName, variabletoGet) => state[reducerName].get(variabletoGet);

module.exports = {
  getYTVideoId,
  getYTPlayListId,
  getStateFromStore,
  loadDisqus
};
