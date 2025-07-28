const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/administration`;

export const authEndpoints = {
  signin: () => `${baseUrl}/signin`,
  signup: () => `${baseUrl}/signup`,
};
