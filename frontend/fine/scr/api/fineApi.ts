import apiClient from "./client";
import type { Fine, FineCreateRequest, FineUpdateRequest, ReferenceData } from "../types/fine";

export const getAllFines = async (): Promise<Fine[]> => {
  const response = await apiClient.get<Fine[]>("/fines");
  return response.data;
};

export const getFineById = async (fineId: number): Promise<Fine> => {
  const response = await apiClient.get<Fine>(`/fines/${fineId}`);
  return response.data;
};

export const getFinesByCarNum = async (carNum: string): Promise<Fine[]> => {
  const response = await apiClient.get<Fine[]>(`/fines/by-car/${carNum}`);
  return response.data;
};

export const createFine = async (data: FineCreateRequest): Promise<Fine> => {
  const response = await apiClient.post<Fine>("/fines", data);
  return response.data;
};

export const updateFine = async (fineId: number, data: FineUpdateRequest): Promise<Fine> => {
  const response = await apiClient.put<Fine>(`/fines/${fineId}`, data);
  return response.data;
};

export const deleteFine = async (fineId: number): Promise<void> => {
  await apiClient.delete(`/fines/${fineId}`);
};

export const getReferences = async (): Promise<ReferenceData> => {
  const response = await apiClient.get<ReferenceData>("/references");
  return response.data;
};

export const downloadFineWord = async (fineId: number): Promise<Blob> => {
  const response = await apiClient.get<Blob>(`/fines/${fineId}/word`, { responseType: "blob" });
  return response.data;
};

export const downloadPeriodExcel = async (dateFrom: string, dateTo: string): Promise<Blob> => {
  const response = await apiClient.get<Blob>("/reports/excel", {
    params: { date_from: dateFrom, date_to: dateTo },
    responseType: "blob",
  });
  return response.data;
};