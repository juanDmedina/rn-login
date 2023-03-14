/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {Alert, Keyboard} from 'react-native';
import styled from 'styled-components/native';
import {StackScreenProps} from '@react-navigation/stack';
import LoginButtons from '../organisms/LoginButtons';
import TextInputsLogin from '../organisms/TextInputsLogin';
import { useAppSelector} from '../../hooks/loginHooks';
import {AuthContext} from '../../context/AuthContext';
import {selectErrorMessage} from '../../redux/slices/authSlice';

const StyledView = styled.View`
  background-color: #ffffff;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
interface Props extends StackScreenProps<any, any> {}

const LoginPage = ({navigation}: Props) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const errorMessage = useAppSelector(selectErrorMessage);

  const {signIn, removeError} = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }

    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const handleLogin = () => {
    Keyboard.dismiss();
    signIn({correo, password});
  };

  const OnChangeEmail = (email: string) => {
    setCorreo(email);
  };

  const OnChangePassword = (clave: string) => {
    setPassword(clave);
  };

  return (
    <StyledView>
      <TextInputsLogin
        OnChangeEmail={OnChangeEmail}
        OnChangePassword={OnChangePassword}
      />
      <LoginButtons
        OnPressSingIn={handleLogin}
        OnPressRegister={() => navigation.navigate('RegisterPage')}
      />
    </StyledView>
  );
};

export default LoginPage;
