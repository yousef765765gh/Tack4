export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  profile_image_url?: string;
  profile_image?: string;
}

export interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  status?: string;
  message?: string;
  data?: {
    token: string;
    user: User;
  };
  token?: string;
  user?: User;
}

export interface ItemsResponse {
  data?: Item[];
  current_page?: number;
  last_page?: number;
  total?: number;
  per_page?: number;
}
