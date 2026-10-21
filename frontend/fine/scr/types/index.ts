export interface Driver {
  driver_id: number;
  name: string;
  surname: string;
  middle_name?: string;
  car_num: string;
  car_model: string;
}
export interface Employee {
  id: number;
  name: string;
  surname: string;
  middle_name?: string;
  username: string;
}
export type { Fine } from "./fine";
export interface Gender {
  id: number;
  name: string;
}