import React from 'react';
import TextInputA from '../atoms/TextInputA';
import {Platform, TextInput} from 'react-native';
import {loginStyles} from '../../theme/loginTheme';
import {TextA} from '../atoms/TextA';
import {TextTitle} from '../atoms/TextTitle';

interface TextInputsLoginProps {
  OnChangeEmail: (value: string) => void;
  OnChangePassword: (value: string) => void;
}

const TextInputsLogin = ({
  OnChangeEmail,
  OnChangePassword,
}: TextInputsLoginProps) => {
  return (
    <>
      <TextTitle>Login</TextTitle>
      <TextA>Email: </TextA>
      <TextInputA OnChange={OnChangeEmail} placeholder="Input email" />
      <TextA>Password: </TextA>
      <TextInput
        placeholder="Input password"
        placeholderTextColor="rgba(17, 12, 12, 0.4)"
        underlineColorAndroid="black"
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
      />
    </>
  );
};

export default TextInputsLogin;
