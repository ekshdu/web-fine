export interface Car {
  id: number;
  car_num: string;
  car_model: string | null;
  id_driver: number;
}

export interface CarCreateRequest {
  car_num: string;
  car_model?: string;
}