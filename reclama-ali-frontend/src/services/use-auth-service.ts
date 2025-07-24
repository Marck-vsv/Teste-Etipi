import api from '@/lib/api';
import { apiEndpoints } from '@/lib/apiEndpoints';
import { SignInRequest, SignUpRequest } from '@/schemas/auth.schema';

export function useAuthService() {
  const signIn = async (body: SignInRequest) => {
    return await api(apiEndpoints.auth.signin(), {
      method: 'POST',
      data: body,
    });
  };

  const signUp = async (body: SignUpRequest) => {
    return await api(apiEndpoints.auth.signup(), {
      method: 'POST',
      data: body,
    });
  };

  return {
    signIn,
    signUp,
  };
}
