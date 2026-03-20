export interface LoginState {
  token: string | null;
  isAdmin: number;
  loading: boolean;
  error: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  isAdmin:number
}