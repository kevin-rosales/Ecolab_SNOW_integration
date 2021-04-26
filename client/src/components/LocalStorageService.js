// LocalStorageService.js

export const setToken = (tokenObj) => {
  localStorage.setItem("access_token", tokenObj.access_token);
  localStorage.setItem("refresh_token", tokenObj.refresh_token);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const clearToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
