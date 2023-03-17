import {describe, expect, jest, test} from '@jest/globals';
import {cleanup, render, fireEvent} from '@testing-library/react-native';
import HomePage from '../../../src/components/pages/HomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../src/context/AuthContext';

const mockedNavigate = jest.fn();
const mockedConfig = jest.fn();
const mockedSignIn = jest.fn();
const mockedCheckToken = jest.fn();
const mockedSignUp = jest.fn();
const mockedLogOut = jest.fn();
const mockedRemoveError = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate}),
}));

jest.mock('react-native-config', () => ({Config: () => mockedConfig}));

const createNavigationProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
    replace: jest.fn(),
  },
  ...props,
});

const navigationProps: any = createNavigationProps({});

describe('HomePage', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    jest.useFakeTimers();
    cleanup();
  });
  test('Should render HomePage component', () => {
    const {getByText} = render(<HomePage {...navigationProps} />);
    const homepage = getByText('Welcome to HomePage');
    expect(homepage).toBeTruthy();
  });

  test('Should click on create And Go to Login', async () => {
    const {getByText} = render(
      <AuthContext.Provider
        value={{
          signIn: mockedSignIn,
          checkToken: mockedCheckToken,
          signUp: mockedSignUp,
          logOut: mockedLogOut,
          removeError: mockedRemoveError,
          statusSelector: '',
          tokenSelector: null,
          errorMessageSelector: 'información incorrecta',
          userSelector: null,
          nameSelector: '',
          emailSelector: '',
          passwordSelector: '',
          dispatch: undefined,
        }}>
        <HomePage {...navigationProps} />
      </AuthContext.Provider>,
    );
    const btnExit = getByText('Exit');
    fireEvent.press(btnExit);
  });
});
