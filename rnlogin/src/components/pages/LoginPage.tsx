/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Alert, Keyboard} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import LoginButtons from '../molecules/LoginButtons';
import TextInputsLogin from '../organisms/TextInputsLogin';
import {LoginContext} from '../../context/AuthContext';

import {CenterView} from '../atoms/CenterView';

interface Props extends StackScreenProps<any, any> {}

const LoginPage = ({navigation}: Props) => {
  const { signIn, removeError, errorMessageSelector, emailSelector, passwordSelector } = LoginContext();
  let errorMessage = errorMessageSelector === undefined ? '' : errorMessageSelector;
  let correo = emailSelector === undefined ? '' : emailSelector;
  let password = passwordSelector === undefined ? '' : passwordSelector;

  useEffect(() => {
    errorMessage = errorMessage === undefined ? '' : errorMessage;
    if (errorMessage.length === 0) {
      return;
    }

    if (errorMessage.includes('incorrecta')) {
      Alert.alert('Login incorrecto', errorMessage, [
        {
          text: 'Ok',
          onPress: removeError,
        },
      ]);
    }
  }, [errorMessage]);

  const handleLogin = () => {
    Keyboard.dismiss();
    signIn({correo, password});
  };

  return (
    <CenterView>
      <TextInputsLogin />
      <LoginButtons
        OnPressSingIn={handleLogin}
        OnPressRegister={() => navigation.navigate('RegisterPage')}
      />
    </CenterView>
  );
};

export default LoginPage;
