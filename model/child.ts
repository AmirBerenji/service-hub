import { UserInfo } from "os";
import { Profile } from "./auth";

export interface ChildFormData {
  name: string;
  last_name: string;
  address: string;
  birthday: string;
  blood_type: string;
  gender: string;
  uuid: string;
  image: File | null;
}

export interface childMessage {
  type: string;
  text: string;
}

export interface Child {
  id: number;
  user_id: number;
  name: string;
  last_name: string;
  address: string;
  birthday: string;
  blood_type: string;
  gender: string;
  uuid: string;
  user: Profile;
  phone: string;
  image: File | null;
}
