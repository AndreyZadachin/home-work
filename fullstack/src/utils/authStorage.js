import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/utils/constants";

export const getStoredToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const getStoredUsername = () => localStorage.getItem(AUTH_USER_KEY);

export const saveSession = (token, username) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, username);
};

export const clearSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};
