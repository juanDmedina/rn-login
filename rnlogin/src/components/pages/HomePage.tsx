/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect} from 'react';
import {TextTitle} from '../atoms/TextTitle';
import {CenterView} from '../atoms/CenterView';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, TouchableOpacity} from 'react-native';
import Loader from '../atoms/Loader';
import {AuthContext} from '../../context/AuthContext';
import { useAppSelector } from '../../hooks/loginHooks';
import { selectStatus } from '../../redux/slices/authSlice';

interface Props extends StackScreenProps<any, any> {}

const HomePage = ({navigation}: Props) => {
  const {logOut} = useContext(AuthContext);
 const status = useAppSelector(selectStatus);
  const redirectLogin = () => {
    logOut();

    status === 'authenticated' ? <Loader /> : <></>;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 10}}
          onPress={() => {
            redirectLogin();
            navigation.replace('LoginScreen');
          }}>
          <Text>Salir </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <CenterView>
      <TextTitle>Welcome to HomePage</TextTitle>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{marginRight: 10}}
        onPress={() => {
          redirectLogin();
          navigation.replace('LoginScreen');
        }}>
        <Text>Salir </Text>
      </TouchableOpacity>
    </CenterView>
  );
};

export default HomePage;
