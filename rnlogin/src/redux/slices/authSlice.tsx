import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../stores/store';
import { Usuario } from '../../interfaces/appInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
  name: string;
  email: string;
  password: string;
}

const initialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
  name: '',
  email: '',
  password: '',
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addMessageError: (state, action) => {
      state.user = null;
      state.status = 'not-authenticated';
      state.token = null;
      state.errorMessage = action.payload.errorMessage;
    },
    removeMessageError: state => {
      state.errorMessage = '';
    },
    login: (state, action) => {
      state.errorMessage = '';
      state.status = 'authenticated';
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    register: (state, action) => {
      state.errorMessage = '';
      state.status = 'not-authenticated';
      state.token = null;
      state.user = action.payload.user;
    },
    logout: state => {
      state.user = null;
      state.status = 'not-authenticated';
      state.token = null;
      state.errorMessage = '';
    },
    initial: state => {
      state.status = 'not-authenticated';
      state.token = null;
      state.user = null;
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setPassword: (state, action) => {
      state.password = action.payload.password;
    },
    cleanAccount: state => {
      state.email = '';
      state.password = '';
    },
  },
});

export const {
  addMessageError,
  removeMessageError,
  login,
  logout,
  initial,
  register,
  setName,
  setEmail,
  setPassword,
  cleanAccount,
} = authSlice.actions;

export const selectToken = (state: RootState) => state.authentication.token;
export const selectErrorMessage = (state: RootState) =>
  state.authentication.errorMessage;
export const selectStatus = (state: RootState) => state.authentication.status;
export const selectUser = (state: RootState) => state.authentication.user;
export const selectName = (state: RootState) => state.authentication.name;
export const selectEmail = (state: RootState) => state.authentication.email;
export const selectPassword = (state: RootState) => state.authentication.password;

export default authSlice.reducer;
