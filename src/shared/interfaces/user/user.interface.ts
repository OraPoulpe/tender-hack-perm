import Password from "antd/es/input/Password";

export interface IUser {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  surname: string;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  is_verified?: boolean | null;
  role_id?: number;
  id: number;
}

export interface IUserRegisterData extends IUser {}

export interface IRegisterResponse extends Omit<IUser, "role_id"> {
  id: number;
}

// export type TLoginData = Pick<IUser, "email"|"password">
export interface TLoginData {
  username: string;
  password: string;
}

export interface IResponse {
  accessToken: string;
}
