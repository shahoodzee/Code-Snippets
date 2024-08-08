import { AUTH, LOGOUT, AUTH_ERROR, SIGNUP } from '../constants/ActionTypes';

const initialState = {
    isUserLoggedIn: false,
    user: null,
    error: null,
  };
  
export default (state = initialState, action) => {
    switch (action.type) {

        case AUTH:
            return { ...state, isUserLoggedIn: true, user: action.payload, error: null };

        case SIGNUP:
            return { ...state, isLoggedIn: true, user: action.payload, error: null };
    
        case LOGOUT:
            return { ...state, isUserLoggedIn: false, user: null, error: null };
        
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        
        default:
            return state;
    }
};