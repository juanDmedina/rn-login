import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginPage from '../components/pages/LoginPage';
import { RegisterPage } from '../components/pages/RegisterPage';

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
