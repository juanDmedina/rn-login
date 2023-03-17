import axios from 'axios';
import Config from 'react-native-config';

const baseURL = Config.REACT_APP_URL_API;

const loginApi = axios.create({baseURL});

export default loginApi;
