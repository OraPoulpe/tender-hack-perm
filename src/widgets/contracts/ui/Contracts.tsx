"use client";

import {
  useGetAllContractsQuery,
  useGetContractFileQuery,
} from "@/src/shared/api/contracts/getContract";
import { IContract } from "@/src/shared/interfaces/contracts";
import { FileWordOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import React, { FC, useEffect, useState } from "react";

const Contracts: FC = () => {
  const { data } = useGetAllContractsQuery();
  console.log("contracts", data);

  const contracts: IContract[] = [
    {
      number: "12345",
      document_name: "Документ 1",
      customer: "Иванов И.И.",
      supplier: "Петров П.И.",
      agreements: [{ contract_id: "12345", document_name: "Доп соглашение" }],
    },
    {
      number: "12345",
      document_name: "Документ 1",
      customer: "Иванов И.И.",
      supplier: "Петров П.И.",
      agreements: [{ contract_id: "12345", document_name: "Доп соглашение" }],
    },
    {
      number: "12345",
      document_name: "Документ 1",
      customer: "Иванов И.И.",
      supplier: "Петров П.И.",
      agreements: [{ contract_id: "12345", document_name: "Доп соглашение" }],
    },
    {
      number: "12345",
      document_name: "Документ 1",
      customer: "Иванов И.И.",
      supplier: "Петров П.И.",
      agreements: [{ contract_id: "12345", document_name: "Доп соглашение" }],
    },
  ];

  return (
    <Flex wrap gap={15} className="p-10" justify="center">
      {contracts.map((contract, key) => (
        <Flex
          vertical
          justify="space-between"
          align="center"
          key={key}
          className="box-border h-60 max-w-52 rounded-2xl bg-slate-200 p-5"
        >
          <Flex align="center" className="h-full">
            <FileWordOutlined style={{ fontSize: "100px", color: "#08c" }} />
          </Flex>
          <div>
            <h1>{contract.document_name}</h1>
            <h2>
              {contract.customer} & {contract.supplier}
            </h2>
          </div>
        </Flex>
      ))}
    </Flex>
  );
};

export default Contracts;
