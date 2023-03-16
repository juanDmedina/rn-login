/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect} from 'react';
import {TextTitle} from '../atoms/TextTitle';
import {CenterView} from '../atoms/CenterView';
import {StackScreenProps} from '@react-navigation/stack';
import Loader from '../atoms/Loader';
import {ButtonExample, ButtonText} from '../atoms/ButtonA';
import { LoginContext } from '../../context/AuthContext';


interface Props extends StackScreenProps<any, any> {}

const HomePage = ({navigation}: Props) => {
  const { logOut, hooks } = LoginContext();
  let status = hooks && hooks.statusSelector;
  const exitPage = () => {
    logOut();

    return status === 'authenticated' ? <Loader /> : <></>;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ButtonExample onPress={exitPage}>
          <ButtonText>Exit</ButtonText>
        </ButtonExample>
      ),
    });
  }, []);

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
