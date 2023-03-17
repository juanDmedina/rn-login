/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Platform, Keyboard, Alert} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {LoginContext} from '../../context/AuthContext';
import {ScrollViewA} from '../atoms/ScrollViewA';
import TextInputsRegister from '../organisms/TextInputsRegister';
import RegisterButtons from '../molecules/RegisterButtons';
import {KeyboardAvoidingA} from '../atoms/KeyboardAvoidingA';
interface Props extends StackScreenProps<any, any> {}

export const RegisterPage = ({navigation}: Props) => {
  const {
    signUp,
    removeError,
    nameSelector,
    errorMessageSelector,
    emailSelector,
    passwordSelector,
  } = LoginContext();
  let nombre = nameSelector === undefined ? '' : nameSelector;
  let errorMessage =
    errorMessageSelector === undefined ? '' : errorMessageSelector;
  let correo = emailSelector === undefined ? '' : emailSelector;
  let password = passwordSelector === undefined ? '' : passwordSelector;

  useEffect(() => {
    errorMessage = errorMessage === undefined ? '' : errorMessage;
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

  return (
    <>
      <KeyboardAvoidingA
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollViewA>
          <TextInputsRegister />
          <RegisterButtons
            OnCreateAccount={onRegister}
            OnPressToLogin={() => navigation.replace('LoginPage')}
          />
        </ScrollViewA>
      </KeyboardAvoidingA>
    </>
  );
};
