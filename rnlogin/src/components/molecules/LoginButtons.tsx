import React from 'react';
import { ButtonExample, ButtonText } from '../atoms/ButtonA';
import styled from 'styled-components/native';

const ButtonsView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface ButtonsProps {
    OnPressSingIn : () => void;
    OnPressRegister : () => void;
}

const LoginButtons = ({OnPressSingIn, OnPressRegister}: ButtonsProps) => {
  return (
    <ButtonsView>
      <ButtonExample onPress={OnPressSingIn}>
        <ButtonText>Sign In</ButtonText>
      </ButtonExample>
      <ButtonExample onPress={OnPressRegister}>
        <ButtonText>Register</ButtonText>
      </ButtonExample>
    </ButtonsView>
  );
};

export default LoginButtons;
