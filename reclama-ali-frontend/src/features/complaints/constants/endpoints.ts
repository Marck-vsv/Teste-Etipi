const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/complaints`;

export const complaintEndpoints = {
  summary: (page: number) =>
    `${baseUrl}?page=${page}&size=10`,
  getById: (id: string) => `${baseUrl}/${id}`,
  create: () => baseUrl,
  updateComplaint: (id: string) => `${baseUrl}/${id}`,
  delete: (id: string) => `${baseUrl}/${id}`,
};
