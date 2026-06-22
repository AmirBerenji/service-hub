export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  activeClass: string;
  chipClass: string;
  created_at: string | null;
  updated_at: string | null;
  services: Service[];
}

export interface Service {
  id: number;
  name: string;
  category_id: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface BusinessApiResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
  errors?: Record<string, string[]>;
}
