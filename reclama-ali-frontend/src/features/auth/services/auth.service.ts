import { SignInRequest, SignUpRequest, LoginResponse } from '@/features/auth/schemas/auth.schema';
import api from '@/lib/api';
import { authEndpoints } from '../constants/endpoints';

export const signIn = async (body: SignInRequest) => {
  return await api.post<LoginResponse>(authEndpoints.signin(), body);
};

export const signUp = async (body: SignUpRequest) => {
  return await api.post<LoginResponse>(authEndpoints.signup(), body);
};
