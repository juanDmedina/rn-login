/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {Platform, Keyboard, Alert} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../../context/AuthContext';
import {useAppSelector} from '../../hooks/loginHooks';
import { selectErrorMessage, selectName, selectEmail, selectPassword } from '../../redux/slices/authSlice';
import {ScrollViewA} from '../atoms/ScrollViewA';
import TextInputsRegister from '../organisms/TextInputsRegister';
import RegisterButtons from '../molecules/RegisterButtons';
import {KeyboardAvoidingA} from '../atoms/KeyboardAvoidingA';
interface Props extends StackScreenProps<any, any> {}

export const RegisterPage = ({navigation}: Props) => {
  const {signUp, removeError} = useContext(AuthContext);
  const errorMessage = useAppSelector(selectErrorMessage);
  const nombre = useAppSelector(selectName);
  const correo = useAppSelector(selectEmail);
  const password = useAppSelector(selectPassword);

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

  return (
    <>
      <KeyboardAvoidingA
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollViewA>
          <TextInputsRegister/>
          <RegisterButtons
            OnCreateAccount={onRegister}
            OnPressToLogin={() => navigation.replace('LoginPage')}
          />
        </ScrollViewA>
      </KeyboardAvoidingA>
    </>
  );
};
