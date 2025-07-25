import {
  SignInRequest,
  SignUpRequest,
} from '@/features/auth/schemas/auth.schema';
import api from '@/lib/api';
import { authEndpoints } from '../constants/endpoints';

export const signIn = async (body: SignInRequest) => {
  return await api(authEndpoints.signin(), {
    method: 'POST',
    data: body,
  });
};

export const signUp = async (body: SignUpRequest) => {
  return await api(authEndpoints.signup(), {
    method: 'POST',
    data: body,
  });
};
