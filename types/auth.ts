export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy: number | string | null;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface LoginData {
  token: string;
  company: Company;
}

export interface LoginResponse {
  success: boolean;
  data: LoginData;
  message: string;
}

//register form data
export interface RegisterFormData {
  name: string; 
    email: string;
    phone: string;
    address: string;
    password: string;
}

export interface RegistrationResponse {
  success: boolean;
  data: LoginData;
  message: string;
}
