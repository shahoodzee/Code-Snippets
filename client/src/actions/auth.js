import * as api from '../api';
import { AUTH, LOGOUT, AUTH_ERROR, SIGNUP } from '../constants/ActionTypes';

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, payload: data });
    router.push('/');
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password' });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    console.log(formData);
    dispatch({ type: SIGNUP, payload: data });
    navigate('/Dashboard');
  } catch (error) {
    console.error('Sign-up error:', error);
    dispatch({ type: AUTH_ERROR, payload: 'Sign-up failed' });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const loginFailure = (message) => {
    return { type: AUTH_ERROR, payload: message };
};


  