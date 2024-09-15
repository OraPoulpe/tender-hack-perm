// import { ILoginData, IResponse } from '@/shared/interfaces/login.interface';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../constants";
import {
  IRegisterResponse,
  IResponse,
  IUser,
  IUserRegisterData,
  TLoginData,
} from "../../interfaces/user";

export const userApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    credentials: "include",
  }),

  endpoints: (build) => ({
    loginUser: build.mutation<void, TLoginData>({
      query: (userData) => {
        const formData = new FormData();

        formData.append("username", userData.username);
        formData.append("password", userData.password);

        return {
          url: `/users/login`,
          method: "POST",

          // headers: {
          //   //   "Content-Type": "multipart/form-data",
          // },
          body: formData,
          formData: true,
        };
      },
    }),

    getUserMe: build.query<IUser, void>({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginUserMutation, useGetUserMeQuery } = userApi;
