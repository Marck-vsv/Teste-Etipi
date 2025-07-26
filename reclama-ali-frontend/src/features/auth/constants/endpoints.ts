const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;

export const authEndpoints = {
  signin: () => `${baseUrl}/signin`,
  signup: () => `${baseUrl}/signup`,
  signout: () => `${baseUrl}/signout`,
};
