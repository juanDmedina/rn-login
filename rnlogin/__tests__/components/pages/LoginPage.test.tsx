import {describe, expect, jest, test} from '@jest/globals';
import {cleanup, render} from '@testing-library/react-native';
import LoginPage from '../../../src/components/pages/LoginPage';

const mockedNavigate = jest.fn();
const mockedConfig = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate}),
}));

jest.mock('react-native-config', () => ({ Config: () => mockedConfig }));


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
});
