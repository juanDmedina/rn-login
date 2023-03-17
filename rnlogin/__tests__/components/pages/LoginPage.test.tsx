import {describe, expect, jest, test} from '@jest/globals';
import {cleanup, render, fireEvent} from '@testing-library/react-native';
import LoginPage from '../../../src/components/pages/LoginPage';
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

describe('LoginPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    cleanup();
  });
  test('Should render Login component', () => {
    const {getByText} = render(<LoginPage {...navigationProps} />);
    const homepage = getByText('Login');
    expect(homepage).toBeTruthy();
  });

  test('Should click on login And Register', async () => {
    const {getByText, getByPlaceholderText} = render(
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
        <LoginPage {...navigationProps} />
      </AuthContext.Provider>,
    );
    const inputEmail = getByPlaceholderText('Input email');
    const inputPassword = getByPlaceholderText('Input password');
    const btnSignIn = getByText('Sign In');
    const btnRegister = getByText('Register');
    fireEvent.changeText(inputEmail, 'test@test.com');
    fireEvent.changeText(inputPassword, '123456');
    fireEvent.press(btnSignIn);
    fireEvent.press(btnRegister);
  });
});
