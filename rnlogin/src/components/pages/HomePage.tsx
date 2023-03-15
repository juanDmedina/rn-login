/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect} from 'react';
import {TextTitle} from '../atoms/TextTitle';
import {CenterView} from '../atoms/CenterView';
import {StackScreenProps} from '@react-navigation/stack';
import Loader from '../atoms/Loader';
import {AuthContext} from '../../context/AuthContext';
import {useAppSelector} from '../../hooks/loginHooks';
import {selectStatus} from '../../redux/slices/authSlice';
import {ButtonExample, ButtonText} from '../atoms/ButtonA';

interface Props extends StackScreenProps<any, any> {}

const HomePage = ({navigation}: Props) => {
  const {logOut} = useContext(AuthContext);
  const status = useAppSelector(selectStatus);
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
