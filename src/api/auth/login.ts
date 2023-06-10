import axiosUnAuthClient from '../base';
interface LoginParams {
  email: string,
  password: string
}
export function login(params: LoginParams) {
  return axiosUnAuthClient.post('auth/login', params)
}
