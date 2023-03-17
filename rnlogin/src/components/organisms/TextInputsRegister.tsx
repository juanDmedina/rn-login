import React, {useState} from 'react';
import TextInputA from '../atoms/TextInputA';
import {Platform, TextInput} from 'react-native';
import {loginStyles} from '../../theme/loginTheme';
import {TextA} from '../atoms/TextA';
import {TextTitle} from '../atoms/TextTitle';

import validationInput from '../../helper/validationInput';
import {TextErrorLabel} from '../atoms/TextErrorLabel';
import { setEmail, setName, setPassword } from '../../redux/slices/authSlice';
import { LoginContext } from '../../context/AuthContext';

const TextInputsRegister = () => {
  const {dispatch} = LoginContext();
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusCorreo, setFocusCorreo] = useState(false);
  const [focusName, setFocusName] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const dispatchFunction = dispatch === undefined ? () => '' : dispatch;


  const OnChangeName = (name: string) => {
    setNombre(name);
     dispatchFunction(setName({name}));
  };

  const OnChangeEmail = (email: string) => {
    setCorreo(email);
    dispatchFunction(setEmail({email}));
  };

  const OnChangePassword = (password: string) => {
    setContrasena(password);
    dispatchFunction(setPassword({password}));
  };
  return (
    <>
      <TextTitle>Register</TextTitle>
      <TextA>Name:</TextA>
      <TextInputA
        OnChange={OnChangeName}
        placeholder="Input name"
        onFocus={() => setFocusName(true)}
        style={[
          loginStyles.inputField,
          Platform.OS === 'ios' && loginStyles.inputFieldIOS,
        ]}
      />
      {validationInput(nombre) && focusName ? (
        <TextErrorLabel>fiel empty or lenght less than 6</TextErrorLabel>
      ) : (
        <></>
      )}
      <TextA>Email: </TextA>
      <TextInputA
        OnChange={OnChangeEmail}
        placeholder="Input email"
        onFocus={() => setFocusCorreo(true)}
        style={[
          loginStyles.inputField,
          Platform.OS === 'ios' && loginStyles.inputFieldIOS,
        ]}
      />
      {validationInput(correo) && focusCorreo ? (
        <TextErrorLabel>fiel empty or lenght less than 6</TextErrorLabel>
      ) : (
        <></>
      )}
      <TextA>Password: </TextA>
      <TextInput
        placeholder="Input password"
        placeholderTextColor="rgba(17, 12, 12, 0.4)"
        underlineColorAndroid="black"
        cursorColor="#000000"
        secureTextEntry
        style={[
          loginStyles.inputField,
          Platform.OS === 'ios' && loginStyles.inputFieldIOS,
        ]}
        onFocus={() => setFocusPassword(true)}
        selectionColor="white"
        onChangeText={value => OnChangePassword(value)}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
      />
      {validationInput(contrasena) && focusPassword ? (
        <TextErrorLabel>fiel empty or lenght less than 6</TextErrorLabel>
      ) : (
        <></>
      )}
    </>
  );
};

export default TextInputsRegister;
