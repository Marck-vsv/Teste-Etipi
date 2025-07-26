import api from '@/lib/api';
import { complaintEndpoints } from '../constants/endpoints';
import type {
  CreateComplaintRequest,
  UpdateComplaintRequest,
} from '../schemas/complaint.schema';
import {
  PaginatedComplaintsResponse,
  UpdateComplaintStatusRequest,
} from '../schemas/complaint.schema';

export const getComplaints = async (page: number, size: number) => {
  const { data } = await api.get<PaginatedComplaintsResponse>(
    complaintEndpoints.getAll(page, size),
  );
  return data;
};

export const createComplaint = async (body: CreateComplaintRequest) => {
  const { data } = await api.post(complaintEndpoints.create(), body);
  return data;
};

export const getComplaintById = async (id: string) => {
  const { data } = await api.get(complaintEndpoints.getById(id));
  return data;
};

export const updateComplaint = async (
  id: string,
  body: UpdateComplaintRequest,
) => {
  const { data } = await api.patch(
    complaintEndpoints.updateComplaint(id),
    body,
  );
  return data;
};

export const updateComplaintStatus = async (
  id: string,
  body: UpdateComplaintStatusRequest,
) => {
  const { data } = await api.patch(complaintEndpoints.updateStatus(id), body);
  return data;
};

export const deleteComplaint = async (id: string) => {
  const { data } = await api.delete(complaintEndpoints.delete(id));
  return data;
};
