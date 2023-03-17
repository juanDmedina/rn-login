import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomePage from '../components/pages/HomePage';
import LoginNavigator from './LoginNavigator';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen
        name="LoginScreen"
        component={LoginNavigator}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
