import apiClient from "./client";

export type OverdueFileKind = "excel" | "word";

export interface OverdueReportStatus {
  state: string;
  status?: "ok" | "empty";
  count?: number;
}

export interface OverdueReportLatest {
  generated_at: string | null;
  excel_file: string | null;
  word_file: string | null;
}

export const startOverdueReport = async (): Promise<string> => {
  const response = await apiClient.post<{ task_id: string }>("/reports/overdue");
  return response.data.task_id;
};

export const getOverdueReportStatus = async (taskId: string): Promise<OverdueReportStatus> => {
  const response = await apiClient.get<OverdueReportStatus>(`/reports/overdue/${taskId}`);
  return response.data;
};

export const getLatestOverdueReport = async (): Promise<OverdueReportLatest> => {
  const response = await apiClient.get<OverdueReportLatest>("/reports/overdue/latest");
  return response.data;
};

export const downloadOverdueFile = async (kind: OverdueFileKind): Promise<Blob> => {
  const response = await apiClient.get<Blob>(`/reports/overdue/files/${kind}`, { responseType: "blob" });
  return response.data;
};