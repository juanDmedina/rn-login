import {describe, expect, jest, test} from '@jest/globals';
import {cleanup, render, fireEvent} from '@testing-library/react-native';
import {RegisterPage} from '../../../src/components/pages/RegisterPage';
import { AuthContext } from '../../../src/context/AuthContext';

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

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    cleanup();
  });
  test('Should render Register component', () => {
    const {getByText} = render(<RegisterPage {...navigationProps} />);
    const homepage = getByText('Register');
    expect(homepage).toBeTruthy();
  });
  test('Should click on create And Go to Login', async () => {
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
        <RegisterPage {...navigationProps} />
      </AuthContext.Provider>,
    );
    const inputEmail = getByPlaceholderText('Input email');
    const inputPassword = getByPlaceholderText('Input password');
    const inputName = getByPlaceholderText('Input name');
    const btnCreate = getByText('Create');
    const btnLogin = getByText('Go Login');
    fireEvent.changeText(inputEmail, 'test@test.com');
    fireEvent.changeText(inputPassword, '123456');
    fireEvent.changeText(inputName, 'prueba');
    fireEvent.press(btnCreate);
    fireEvent.press(btnLogin);
  });
});
