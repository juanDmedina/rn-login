import React from 'react';
import styled from 'styled-components/native';



const StyledView = styled.View`
  background-color: papayawhip;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  color: palevioletred;
  `;

const LoginPage = () => {
    return (
      <StyledView>
        <StyledText>login</StyledText>
      </StyledView>
    );
};

export default LoginPage;
