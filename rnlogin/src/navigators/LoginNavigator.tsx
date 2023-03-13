import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import RegisterPage from '../components/pages/RegisterPage';
import HomePage from '../components/pages/HomePage';
import LoginPage from '../components/pages/LoginPage';

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
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
