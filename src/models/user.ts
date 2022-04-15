export interface UserState {
  users: User[];
}

export interface AuthSate {
  isLogged: boolean;
  error: string | null;
  userInfo: UserAuth | null;
}

export interface User {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
}

export interface UserAuth {
  id: number;
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
  accessToken: string;
}
