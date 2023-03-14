import React from 'react';
import AppNavigator from './AppNavigator';
import LoginNavigator from './LoginNavigator';
import { useAppSelector } from '../hooks/loginHooks';
import { selectStatus } from '../redux/slices/authSlice';



const Navigator = () => {
  const isLoggedIn = useAppSelector(selectStatus);
  return <>{isLoggedIn === 'authenticated' ? <AppNavigator /> : <LoginNavigator />}</>;
};

export default Navigator;
