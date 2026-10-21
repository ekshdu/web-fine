export interface Fine {
  id: number;
  date_time: string;
  num_post: string;
  fine_place: string;
  actual_speed: number;
  id_car: number;
  id_emp: number;
  driver_name: string;
  driver_surname: string;
  driver_middle_name: string | null;
  car_num: string;
  car_model: string | null;
  fine_sum: number;
  id_fine_sum: number;
  section_num: string;
  id_fine_section: number;
  fine_speed: number;
  id_speed_fine: number;
  status_name: string;
  id_status_fine: number;
  emp_name: string;
  emp_surname: string;
}

export interface FineUpdateRequest {
  id_fine_sum?: number;
  id_status_fine?: number;
  id_speed_fine?: number;
  id_fine_section?: number;
  date_time?: string;
  num_post?: string;
  fine_place?: string;
  actual_speed?: number;
}

export interface FineCreateRequest {
  id_emp: number;
  car_num: string;
  id_fine_sum: number;
  id_speed_fine: number;
  id_fine_section: number;
  date_time: string;
  fine_place: string;
  actual_speed: number;
}

export interface ReferenceStatus {
  id: number;
  name: string;
}

export interface ReferenceFineSum {
  id: number;
  summary: number;
}

export interface ReferenceFineSection {
  id: number;
  section_num: string;
}

export interface ReferenceFineSpeed {
  id: number;
  fine_speed: number;
}

export interface ReferenceData {
  statuses: ReferenceStatus[];
  fine_sums: ReferenceFineSum[];
  fine_sections: ReferenceFineSection[];
  fine_speeds: ReferenceFineSpeed[];
}