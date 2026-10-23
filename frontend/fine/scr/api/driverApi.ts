import apiClient from "./client";
import type { Driver, Gender } from "../types";

export interface DriverRegisterData {
  surname: string;
  name: string;
  middle_name: string | null;
  plate: string;
  car_model: string;
  id_gender: number | null;
  place_of_birth: string | null;
  date_of_birth: string | null;
}

export const getGenders = async (): Promise<Gender[]> => {
  const response = await apiClient.get<Gender[]>("/genders");
  return response.data;
};

export const registerDriver = async (data: DriverRegisterData): Promise<Driver> => {
  const response = await apiClient.post<Driver>("/driver/register", data);
  return response.data;
};