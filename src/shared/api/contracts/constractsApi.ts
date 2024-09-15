import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../constants";

export const contractsApi = createApi({
  reducerPath: "contracts",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    credentials: "include",
  }),

  tagTypes: ["ContractsData"],

  endpoints: () => ({}),
});
