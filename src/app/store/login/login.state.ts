import { LoginState } from "./login.model";

export const initialState: LoginState = {
  token: null,
  isAdmin: 0,
  loading: false,
  error: null,
};
