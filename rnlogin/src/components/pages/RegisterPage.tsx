/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Platform, Keyboard, Alert} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../../context/AuthContext';
import {useAppSelector} from '../../hooks/loginHooks';
import {selectErrorMessage} from '../../redux/slices/authSlice';
import {ScrollViewA} from '../atoms/ScrollViewA';
import TextInputsRegister from '../organisms/TextInputsRegister';
import RegisterButtons from '../molecules/RegisterButtons';
import {KeyboardAvoidingA} from '../atoms/KeyboardAvoidingA';
interface Props extends StackScreenProps<any, any> {}

export const RegisterPage = ({navigation}: Props) => {
  const {signUp, removeError} = useContext(AuthContext);
  const errorMessage = useAppSelector(selectErrorMessage);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }

    if (errorMessage.includes('Registro Exitoso')) {
      Alert.alert('', errorMessage, [
        {
          text: 'Ok',
          onPress: removeError,
        },
      ]);
      return;
    }

    Alert.alert('Registro incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    Keyboard.dismiss();
    signUp({
      nombre,
      correo,
      password,
    });
  };

  const OnChangeName = (name: string) => {
    setNombre(name);
  };

  const OnChangeEmail = (email: string) => {
    setCorreo(email);
  };

  const OnChangePassword = (clave: string) => {
    setPassword(clave);
  };

  return (
    <>
      <KeyboardAvoidingA
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollViewA>
          <TextInputsRegister
            OnChangeName={OnChangeName}
            OnChangeEmail={OnChangeEmail}
            OnChangePassword={OnChangePassword}
          />
          <RegisterButtons
            OnCreateAccount={onRegister}
            OnPressToLogin={() => navigation.replace('LoginPage')}
          />
        </ScrollViewA>
      </KeyboardAvoidingA>
    </>
  );
};
