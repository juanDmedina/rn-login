import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../stores/store';
import { Usuario } from '../../interfaces/appInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

const initialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addMessageError: (state, action) => {
      state.user = null;
      state.status = 'not-authenticated';
      state.token = null;
      state.errorMessage = action.payload;
    },
    removeMessageError: state => {
      state.errorMessage = '';
    },
    login: (state, action) => {
      state.errorMessage = '';
      state.status = 'authenticated';
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: state => {
      state.user = null;
      state.status = 'not-authenticated';
      state.token = null;
      state.errorMessage = '';
    },
    initial: state => {
      state.status = 'not-authenticated';
      state.token = null;
      state.user = null;
    },
  },
});

// export const fetchUsers =
//   ({correo, password}: LoginData) =>
//   async (
//     dispatch
//   ) => {
//     try {
//       const {data} = await loginApi.post<LoginResponse>('/auth/login', {
//         correo,
//         password,
//       });

//       dispatch(success({token: data.token, user: data.usuario}));

//       await AsyncStorage.setItem('token', data.token);
//     } catch ({error}: any) {
//       dispatch(error('Información incorrecta'));
//     }
//   };

// // export const fetchUsers = () => async (dispatch: any) => {
// //   try {
// //     const userLists = await getUserList();
// //     dispatch(success({userList: userLists}));
// //   } catch (err) {
// //     dispatch(error());
// //   }
// // };

export const {addMessageError, removeMessageError, login, logout, initial} =
  authSlice.actions;

export const selectToken = (state: RootState) => state.authentication.token;
export const selectErrorMessage = (state: RootState) =>
  state.authentication.errorMessage;
export const selectStatus = (state: RootState) => state.authentication.status;
export const selectUser = (state: RootState) => state.authentication.user;

export default authSlice.reducer;
