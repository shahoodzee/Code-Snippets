import * as api from '../api';
import { AUTH, LOGOUT, AUTH_ERROR, signUp } from '../constants/ActionTypes';
import { storeToken, decodeToken, removeToken } from '../common/Auth/tokenization';

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.login(formData);
    console.log(response);
    if (response['User Authenticated']) {

      await storeToken(response.token);
      const user = await decodeToken(response.token);
      dispatch({ type: AUTH, payload: { user, token: response.token } });
      navigate('/Dashboard');
      
    } else {
      dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password' });
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password' });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(formData);
    dispatch({ type: signUp, payload: data });
    navigate('/Dashboard');
  } catch (error) {
    console.error('Sign-up error:', error);
    dispatch({ type: AUTH_ERROR, payload: 'Sign-up failed' });
  }
};

export const logout = () => async (dispatch) => {
  removeToken();
  dispatch({ type: LOGOUT });
};

export const loginFailure = (message) => {
    return { type: AUTH_ERROR, payload: message };
};


  