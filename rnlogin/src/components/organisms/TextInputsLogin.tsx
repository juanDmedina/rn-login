import React, {useState} from 'react';
import TextInputA from '../atoms/TextInputA';
import {Platform, TextInput} from 'react-native';
import {loginStyles} from '../../theme/loginTheme';
import {TextA} from '../atoms/TextA';
import {TextTitle} from '../atoms/TextTitle';
import validationInput from '../../helper/validationInput';
import {TextErrorLabel} from '../atoms/TextErrorLabel';
import {setEmail, setPassword} from '../../redux/slices/authSlice';
import {LoginContext} from '../../context/AuthContext';

const TextInputsLogin = () => {
  const {dispatch} = LoginContext();
  const [focus, setFocus] = useState(false);
  const [focusContrasena, setFocusContrasena] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const dispatchFunction = dispatch === undefined ? () => '' : dispatch;

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
      <TextTitle>Login</TextTitle>
      <TextA>Email: </TextA>
      <TextInputA
        OnChange={OnChangeEmail}
        placeholder="Input email"
        onFocus={() => setFocus(true)}
        style={[
          loginStyles.inputField,
          Platform.OS === 'ios' && loginStyles.inputFieldIOS,
        ]}
      />
      {validationInput(correo) && focus ? (
        <TextErrorLabel>fiel empty or lenght less than 6</TextErrorLabel>
      ) : (
        <></>
      )}
      <TextA>Password: </TextA>
      <TextInput
        placeholder="Input password"
        placeholderTextColor="rgba(17, 12, 12, 0.4)"
        cursorColor="#000000"
        underlineColorAndroid="#000000"
        secureTextEntry
        style={[
          loginStyles.inputField,
          Platform.OS === 'ios' && loginStyles.inputFieldIOS,
        ]}
        selectionColor="white"
        onChangeText={value => OnChangePassword(value)}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        onFocus={() => setFocusContrasena(true)}
      />
      {validationInput(contrasena) && focusContrasena ? (
        <TextErrorLabel>fiel empty or lenght less than 6</TextErrorLabel>
      ) : (
        <></>
      )}
    </>
  );
};

export default TextInputsLogin;
