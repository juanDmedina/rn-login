/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginResponse,
  LoginData,
  RegisterData,
  Usuario,
} from '../interfaces/appInterfaces';
import {useAppDispatch, useAppSelector} from '../hooks/loginHooks';
import loginApi from '../api/loginApi';
import {
  AuthState,
  addMessageError,
  initialRun,
  login,
  logout,
  register,
  removeMessageError,
  selectEmail,
  selectErrorMessage,
  selectName,
  selectPassword,
  selectStatus,
  selectToken,
  selectUser,
} from '../redux/slices/authSlice';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';

type AuthContextProps = {
  checkToken: () => void;
  signUp: (registerData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
  statusSelector: string;
  tokenSelector: string | null;
  errorMessageSelector: string;
  userSelector: Usuario | null;
  nameSelector: string;
  emailSelector: string;
  passwordSelector: string;
  dispatch: ThunkDispatch<
    {
      authentication: AuthState;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction> | undefined;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const dispatch = useAppDispatch();
  const statusSelector = useAppSelector(selectStatus);
  const tokenSelector = useAppSelector(selectToken);
  const errorMessageSelector = useAppSelector(selectErrorMessage);
  const userSelector = useAppSelector(selectUser);
  const nameSelector = useAppSelector(selectName);
  const emailSelector = useAppSelector(selectEmail);
  const passwordSelector = useAppSelector(selectPassword);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    // No token, no autenticado
    if (!token) {
      return dispatch(initialRun());
    }

    // Hay token
    const resp = await loginApi.get('/auth');
    if (resp.status !== 200) {
      return dispatch(initialRun());
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
    } catch ({error}: any) {
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
      dispatch(addMessageError({errorMessage: 'valida la información'}));
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
        statusSelector,
        tokenSelector,
        errorMessageSelector,
        userSelector,
        nameSelector,
        emailSelector,
        passwordSelector,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const LoginContext = () => useContext(AuthContext);
