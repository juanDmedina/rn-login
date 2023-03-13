import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomePage from '../components/pages/HomePage';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
