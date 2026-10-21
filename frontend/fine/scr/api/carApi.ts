import apiClient from "./client";
import type { Car, CarCreateRequest } from "../types/car";

export const getDriverCars = async (driverId: number): Promise<Car[]> => {
  const response = await apiClient.get<Car[]>(`/drivers/${driverId}/cars`);
  return response.data;
};

export const addCar = async (driverId: number, data: CarCreateRequest): Promise<Car> => {
  const response = await apiClient.post<Car>(`/drivers/${driverId}/cars`, data);
  return response.data;
};

export const unlinkCar = async (driverId: number, carId: number): Promise<void> => {
  await apiClient.delete(`/drivers/${driverId}/cars/${carId}`);
};