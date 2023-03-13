import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginNavigator from './src/navigators/LoginNavigator';


const App = () => {
  return (
    <NavigationContainer>
        <LoginNavigator />
    </NavigationContainer>
  );
};

export default App;
