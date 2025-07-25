const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/complaints`;

export const complaintEndpoints = {
  getAll: () => baseUrl,
  getById: (id: string) => `${baseUrl}/${id}`,
  create: () => baseUrl,
  updateComplaint: (id: string) => `${baseUrl}/${id}`,
  updateStatus: (id: string) => `${baseUrl}/${id}/status`,
  delete: (id: string) => `${baseUrl}/${id}`,
};
