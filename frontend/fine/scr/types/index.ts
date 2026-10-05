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
export interface Fine {
  id: number;
  date_time: string;
  num_post: string;
  car_num: string;
  car_model?: string;
  fine_place: string;
  summary: number;
  status: string;
  fio?: string;
  section_num?: string;
  actual_speed?: number;
  fine_speedcol?: number;
}
export interface Gender {
  id: number;
  name: string;
}