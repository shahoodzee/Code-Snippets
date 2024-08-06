import * as api from '../api';
import { AUTH, LOGOUT, AUTH_ERROR } from '../constants/ActionTypes';

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, payload: data });
    router.push('/');
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password' });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const loginFailure = (message) => {
    return { type: AUTH_ERROR, payload: message };
};
  