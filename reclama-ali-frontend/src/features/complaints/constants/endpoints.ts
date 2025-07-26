const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/complaints`;

export const complaintEndpoints = {
  summary: (page: number, size: number) =>
    `${baseUrl}?page=${page}&size=${size}`,
  getById: (id: string) => `${baseUrl}/${id}`,
  create: () => baseUrl,
  updateComplaint: (id: string) => `${baseUrl}/${id}`,
  updateStatus: (id: string) => `${baseUrl}/${id}/status`,
  delete: (id: string) => `${baseUrl}/${id}`,
};
