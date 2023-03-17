import React from 'react';
import {ButtonExample, ButtonText} from '../atoms/ButtonA';
import styled from 'styled-components/native';

const ButtonsView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface ButtonsProps {
  OnCreateAccount: () => void;
  OnPressToLogin: () => void;
}

const RegisterButtons = ({OnCreateAccount, OnPressToLogin}: ButtonsProps) => {
  return (
    <ButtonsView>
      <ButtonExample onPress={OnCreateAccount}>
        <ButtonText>Create</ButtonText>
      </ButtonExample>
      <ButtonExample onPress={OnPressToLogin}>
        <ButtonText>Go Login</ButtonText>
      </ButtonExample>
    </ButtonsView>
  );
};

export default RegisterButtons;
