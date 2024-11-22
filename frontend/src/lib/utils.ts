import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token-key";

export const getAuthenticatedUser = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    return jwtDecode(token);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/";
};
