export const BASE_URL = 'https://shelynx.mediaclocksoft.com.au/api';

const apiUrls = {
  homeApi: 'https://randomuser.me/api/?results=10',
  profileApi: '/api/profile',
  signup: '/v1/mobile/auth/register',
  login: '/v1/mobile/auth/login',
  forgetpassword: '/v1/mobile/auth/forget-password',
  getprofile: '/v1/mobile/profile/',
  resetPassword: '/v1/mobile/auth/reset-password',
  Googlelogin: '/api/auth/google',
createorder:'/v1/mobile/order/create-order',


  gettrandingsong: '/api/songs/trending',
  otpverify: '/v1/mobile/auth/verify-otp',
  getagent: '/v1/mobile/agent/agentlist',
  selectAgent: '/v1/mobile/agent/select'

};

export default apiUrls;
