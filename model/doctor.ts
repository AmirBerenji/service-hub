// export interface DoctorTranslation {
//   id?: number;
//   language_id: number;
//   language_code?: string;
//   language_name?: string;
//   name: string;
//   bio?: string;
//   education?: string;
//   address?: string;
// }

export interface Doctor {
  id?: number;
  email: string;
  phone: string;
  specialization: string;
  experience_years: number;
  license_number: string;
  location_id: number;
  status: string;
  translations: DoctorTranslation[];
}

export interface DoctorTranslation {
  language_id: number;
  name: string;
  bio: string;
  education: string;
  address: string;
}

export interface DoctorFormData {
  email: string;
  phone: string;
  specialization: string;
  experience_years: string;
  license_number: string;
  location_id: string;
  status: string;
}

export interface DoctorResponse {
  success: boolean;
  message: string;
  data: DoctorDetails;
}

export interface DoctorDetails {
  id: number;
  user_id: number;
  user: DoctorUser;
  email: string;
  phone: string;
  specialization: string;
  experience_years: number;
  license_number: string;
  image: string | null;
  status: string;
  location: DoctorLocation;
  name: string;
  bio: string;
  education: string;
  address: string;
  translations: DoctorTranslationResponse[];
  created_at: string;
  updated_at: string;
  average_rating: number;
  reviews_count: number;
}

export interface DoctorUser {
  id: number;
  name: string;
  email: string;
}

export interface DoctorLocation {
  id: number;
  city: string;
  district: string | null;
  postal_code: string;
}

export interface DoctorTranslationResponse {
  id: number;
  language_id: number;
  language_code: string;
  language_name: string;
  name: string;
  bio: string;
  education: string;
  address: string;
}
