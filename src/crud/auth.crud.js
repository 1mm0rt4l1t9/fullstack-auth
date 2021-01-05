import axios from "axios";

const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';

export const register = (data) => {
  return axios.post(REGISTER_URL, data);
}

export const login = (data) => {
  return axios.post(LOGIN_URL, data);
}