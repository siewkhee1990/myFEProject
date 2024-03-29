import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getSingpassLoginUrl = (callbackUrlPath, sessionId) => {
  console.log(process.env);
  const targetUrl = `${backendUrl}/login?${new URLSearchParams({
    callbackUrlPath,
    sessionId,
  })}`;
  return axios.get(targetUrl);
};

export const getAccessToken = (callbackUrlPath, code) => {
  const targetUrl = `${backendUrl}/token?${new URLSearchParams({
    callbackUrlPath,
    code,
  })}`;
  return axios.get(targetUrl);
};

export const decryptToken = (token) => {
  const targetUrl = `${backendUrl}/decodeToken`;
  return axios.post(targetUrl, token);
};

export const getSession = (accessToken) => {
  const sessionUrl = `${backendUrl}/user`;
  return axios.post(sessionUrl, { accessToken });
};

export const buyItem = (id) => {
  const checkoutUrl = `${backendUrl}/createCheckout/${id}`;
  return axios.post(checkoutUrl);
};

export const getProducts = () => {};
