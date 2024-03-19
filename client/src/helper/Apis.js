export const baseURL = "http://localhost:8000";
const apiList = {
  login: `${baseURL}/auth/login`,
  signup: `${baseURL}/auth/register`,
  stream: `${baseURL}/api/stream`,
};

export default apiList;