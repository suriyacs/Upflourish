import axios from 'axios/index';

import { apiConstant } from '../globals/AppConstant';

const generatePassPhrase = (learnerId, passPhrase) => axios({
  method: 'post',
  url: `${apiConstant.LEARNER}/${learnerId}/${apiConstant.CREATEWALLET}`,
  data: {
    passPhrase
  }
});

const retrieveCertificate = (roleId, courseId) => axios({
  method: 'get',
  url: `${apiConstant.LEARNER}/${roleId}/${apiConstant.COURSE}/${courseId}/${apiConstant.CERTIFICATE}`
});

const retrieveDownloadUrl = (roleId, certificateId) => axios({
  method: 'get',
  url: `${apiConstant.LEARNER}/${roleId}/${apiConstant.CERTIFICATE}/${certificateId}/${apiConstant.DOWNLOAD}`
});

const loadCertificate = (roleId, certificateId) => axios({
  method: 'get',
  url: `${apiConstant.LEARNER}/${certificateId}/${apiConstant.UPLOADCERTIFICATE}`
});

module.exports = {
  generatePassPhrase,
  retrieveCertificate,
  retrieveDownloadUrl,
  loadCertificate
};
