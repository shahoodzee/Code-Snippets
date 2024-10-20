import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const storeToken = (token) => {
  Cookies.set('token', token, { expires: 3600 });
};

export const getToken = () => {
  return Cookies.get('token');
};  

export const removeToken = () => {
  Cookies.remove('token');
};
