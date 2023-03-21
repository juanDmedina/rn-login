/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {TextTitle} from '../atoms/TextTitle';
import {CenterView} from '../atoms/CenterView';
import {StackScreenProps} from '@react-navigation/stack';
import Loader from '../atoms/Loader';
import {ButtonExample, ButtonText} from '../atoms/ButtonA';
import {LoginContext} from '../../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

const HomePage = ({navigation}: Props) => {
  const {logOut, statusSelector} = LoginContext();
  let status = statusSelector === undefined ? 'error' : statusSelector;
  const exitPage = () => {
    logOut();
    return status === 'authenticated' ? <Loader /> : <></>;
  };

  useEffect(() => {
    if (status !== 'authenticated') {
      navigation.replace('LoginScreen');
    }
  }, [status]);

  return (
    <CenterView>
      <TextTitle>Welcome to HomePage</TextTitle>
      <ButtonExample onPress={exitPage}>
        <ButtonText>Exit</ButtonText>
      </ButtonExample>
    </CenterView>
  );
};

export default HomePage;
