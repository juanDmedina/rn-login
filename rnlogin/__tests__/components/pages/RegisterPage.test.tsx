import {describe, expect, jest, test} from '@jest/globals';
import {cleanup, render} from '@testing-library/react-native';
import { RegisterPage } from '../../../src/components/pages/RegisterPage';

const mockedNavigate = jest.fn();
const mockedConfig = jest.fn();

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
});
