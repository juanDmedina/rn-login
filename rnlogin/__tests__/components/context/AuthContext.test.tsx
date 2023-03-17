import {Text, View} from 'react-native';
import {describe, expect, test} from '@jest/globals';
import {render} from '@testing-library/react-native';
import {AuthProvider} from '../../../src/context/AuthContext';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/stores/store';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockedConfig = jest.fn();
jest.mock('react-native-config', () => ({Config: () => mockedConfig}));

describe('Auth provider testing', () => {
  test('Children should render inside AuthContext', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <AuthProvider>
            <View>
              <Text>Hola desde un view</Text>
            </View>
          </AuthProvider>
        </NavigationContainer>
      </Provider>,
    );
    const homepage = getByText('Hola desde un view');
    expect(homepage).toBeTruthy();
  });
});
