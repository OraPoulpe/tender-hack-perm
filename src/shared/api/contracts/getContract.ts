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
    getContractFile: build.query<string, number>({
      query: (id) => ({
        url: `/contracts/get/${id}/document`,
        method: "GET",
        responseHandler: (response) => {
          console.log(response);
          return response.blob();
        },
      }),
      transformResponse: (response: Blob) => {
        // Преобразуем Blob в временный URL
        return URL.createObjectURL(response);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllContractsQuery, useGetContractQuery, useGetContractFileQuery } =
  getContractApi;
