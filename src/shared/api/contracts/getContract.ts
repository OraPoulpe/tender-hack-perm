"use client";

import { IContract } from "../../interfaces/contracts/contracts.interface";
import { contractsApi } from "./constractsApi";

const getContractApi = contractsApi.injectEndpoints({
  endpoints: (build) => ({
    getAllContracts: build.query<IContract[], void>({
      query: () => ({
        url: "/contracts/get_all",
        method: "GET",
      }),

      // providesTags: (result) =>
      // result
      //     ? [
      //           ...result.map(({ id }) => ({ type: 'Sections', id })),
      //           { type: 'Sections', id: 'LIST' },
      //       ]
      //     : [{ type: 'Sections', id: 'LIST' }],
    }),

    getContract: build.query<IContract, number>({
      query: (id) => ({
        url: `/contracts/get/${id}`,
        method: "GET",
      }),
    }),
    getContractFile: build.query<Blob, number>({
      query: (id) => ({
        url: `/contracts/get/${id}/document`,
        method: "GET",
        // responseHandler: async (response) => {
        //   if (!response.ok) {
        //     throw new Error('Failed to fetch the document');
        //   }
        //   console.log(response)
        //   return response.blob();
        // },
        responseHandler: (response) => response.blob(),
      }),
      // transformResponse: (response: Blob) => {
      //   // Преобразуем Blob в временный URL
      //   return URL.createObjectURL(response);
      // },
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllContractsQuery, useGetContractQuery, useGetContractFileQuery } =
  getContractApi;
