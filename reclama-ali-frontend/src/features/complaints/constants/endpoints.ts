const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/complaint`;

export const complaintEndpoints = {
  summary: (page: number) =>
    `${baseUrl}/summary?page=${page}&size=5`,
  getById: (id: string) => `${baseUrl}/${id}`,
  create: () => baseUrl,
  updateComplaint: (id: string) => `${baseUrl}/${id}`,
  delete: (id: string) => `${baseUrl}/${id}`,
};
