import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth', formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
