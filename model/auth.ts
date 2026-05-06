import { url } from "inspector";

export interface Register {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  phone: string;
  role: string;
}

export interface Profile {
  id: number;
  email: string;
  name: string;
  phone: string;
  roles: string;
  photo: string;
  photoUrl: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface UpdateProfile {
  name: string;
  phone: string;
  email: string;
}

export interface UpdateProfileImage {
  photo: File;
}
