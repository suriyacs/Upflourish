import axios from 'axios/index';

const fetchExpertsService = data => axios({
  method: 'post',
  url: '/Users/getExperts',
  data
});

const inviteExpertService = data => axios({
  method: 'post',
  url: '/Users/expert/invite',
  data
});

const deleteExpertService = expertId => axios({
  method: 'put',
  url: `/Users/${expertId}`,
  data: {
    status: 'DELETED'
  }
});

const fetchUserCategoryService = expertId => axios({
  method: 'get',
  url: `/Experts/${expertId}/categories`
});

const updateUserCategoryService = (userId, data) => axios({
  method: 'POST',
  url: `/Users/map-categories/${userId}`,
  data
});

const verifyTokenService = token => axios({
  method: 'get',
  url: `/Users/verifyToken?token=${token}`
});

const expertSignInService = data => axios({
  method: 'put',
  url: `Users/expert/signup/${data.id}`,
  data
});

const resendSignUpService = expert => axios({
  method: 'post',
  url: `/Users/sendInviteEmail/${expert.id}`
});

const createCategoryService = category => axios({
  method: 'post',
  url: '/Categories',
  data: {
    name: category.name,
    description: category.description
  }
});

const updateCategoryService = category => axios({
  method: 'patch',
  url: `/Categories/${category.id}`,
  data: {
    name: category.name,
    description: category.description,
    id: category.id
  }
});

module.exports = {
  fetchExpertsService,
  inviteExpertService,
  deleteExpertService,
  verifyTokenService,
  expertSignInService,
  resendSignUpService,
  fetchUserCategoryService,
  updateUserCategoryService,
  createCategoryService,
  updateCategoryService
};
