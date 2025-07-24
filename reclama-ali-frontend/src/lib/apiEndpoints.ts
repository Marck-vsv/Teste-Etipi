const baseUrl = `${process.env.NEX_PUBLIC_BASE_URL}/api`;

export const apiEndpoints = {
  auth: {
    authUrl: `${baseUrl}/auth`,
    signin: () => `${apiEndpoints.auth.authUrl}/signin`,
    signup: () => `${apiEndpoints.auth.authUrl}/signup`,
    signout: () => `${apiEndpoints.auth.authUrl}/signout`
  },
};
