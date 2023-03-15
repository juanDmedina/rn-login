/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interfaces/appInterfaces';
import {useAppDispatch} from '../hooks/loginHooks';
import loginApi from '../api/loginApi';
import {
  addMessageError,
  initial,
  login,
  logout,
  register,
  removeMessageError,
} from '../redux/slices/authSlice';

type AuthContextProps = {
  checkToken: () => void;
  signUp: (registerData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    // No token, no autenticado
    if (!token) {
      return dispatch(initial());
    }

    // Hay token
    const resp = await loginApi.get('/auth');
    if (resp.status !== 200) {
      return dispatch(initial());
    }

    await AsyncStorage.setItem('token', resp.data.token);
    dispatch(login({token: resp.data.token, user: resp.data.usuario}));
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const {data} = await loginApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      if (data.token) {
        dispatch(login({token: data.token, user: data.usuario}));
      }

      await AsyncStorage.setItem('token', data.token);
    } catch ({ error }: any) {
      dispatch(addMessageError({errorMessage: 'Información incorrecta'}));
    }
  };

  const signUp = async ({nombre, correo, password}: RegisterData) => {
    try {
      const {data} = await loginApi.post<LoginResponse>('/usuarios', {
        correo,
        password,
        nombre,
      });
      dispatch(register({user: data.usuario}));
      dispatch(addMessageError({errorMessage: 'Registro Exitoso'}));
    } catch ({error}: any) {
      dispatch(addMessageError({errorMessage: 'Información incorrecta'}));
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
  };

  const removeError = () => {
    dispatch(removeMessageError());
  };

  return (
    <AuthContext.Provider
      value={{
        checkToken,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
