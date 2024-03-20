export const baseURL = "http://localhost:8000";
const apiList = {
  login: `${baseURL}/auth/login`,
  signup: `${baseURL}/auth/register`,
  stream: `${baseURL}/api/stream`,
  session:`${baseURL}/api/stream/date`,
  history:`${baseURL}/api/stream/history`,
  registerToken:`${baseURL}/api/stream/registerToken`
};

export default apiList;