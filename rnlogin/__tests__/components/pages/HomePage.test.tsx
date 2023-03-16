import {describe, expect, jest, test} from '@jest/globals';
import {cleanup, render} from '@testing-library/react-native';
import HomePage from '../../../src/components/pages/HomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
});
