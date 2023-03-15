/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {Alert, Keyboard} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import LoginButtons from '../molecules/LoginButtons';
import TextInputsLogin from '../organisms/TextInputsLogin';
import {useAppSelector} from '../../hooks/loginHooks';
import {AuthContext} from '../../context/AuthContext';
import { selectErrorMessage, selectEmail, selectPassword } from '../../redux/slices/authSlice';
import {CenterView} from '../atoms/CenterView';

interface Props extends StackScreenProps<any, any> {}

const LoginPage = ({navigation}: Props) => {
  const errorMessage = useAppSelector(selectErrorMessage);
  const correo = useAppSelector(selectEmail);
  const password = useAppSelector(selectPassword);

  const {signIn, removeError} = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }

    if (errorMessage.includes('incorrecto')) {
      Alert.alert('Registro incorrecto', errorMessage, [
        {
          text: 'Ok',
          onPress: removeError,
        },
      ]);
      return;
    }
  }, [errorMessage]);

  const handleLogin = () => {
    Keyboard.dismiss();
    signIn({correo, password});
  };


  return (
    <CenterView>
      <TextInputsLogin/>
      <LoginButtons
        OnPressSingIn={handleLogin}
        OnPressRegister={() => navigation.navigate('RegisterPage')}
      />
    </CenterView>
  );
};

export default LoginPage;
