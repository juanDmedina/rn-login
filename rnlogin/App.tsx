import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigators/Navigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/stores/store';
import {AuthProvider} from './src/context/AuthContext';

const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppState>
          <Navigator />
        </AppState>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
