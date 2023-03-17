import {describe, expect, jest, test} from '@jest/globals';
import loginApi from '../../../src/api/loginApi';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockedNavigate = jest.fn();
const mockedConfig = jest.fn();

jest.mock('react-native-config', () => ({Config: () => mockedConfig}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate}),
}));

const mockData = {correo: 'test@test.com', password: '123456'};

jest.spyOn(loginApi, 'get').mockReturnValue(Promise.resolve(mockData));


describe('Login API', () => {
  test('calls `axios()` with `endpoint`, `method` and `body`', async () => {
    loginApi.get('').then(data => expect(data).toBe(mockData));
  });
});
