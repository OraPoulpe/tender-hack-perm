"use client"

import {
  useGetAllContractsQuery,
  useGetContractFileQuery,
} from "@/src/shared/api/contracts/getContract";
import { IContract } from "@/src/shared/interfaces/contracts";
import { FileWordOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import React, { FC, useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const Contracts: FC = () => {
  const { data } = useGetAllContractsQuery();
  const { data: fileUrl, isLoading, error } = useGetContractFileQuery(3);
  console.log("contracts ", data);
  console.log("fileUrl", fileUrl);
  // console.log("fileBlob ", fileBlob);

  // const [file, setFile] = useState<string>();

  // useEffect(() => {
  //   if (fileUrl) {
  //     // Преобразуем Blob в объект, который понимает react-doc-viewer
  //     const docObject = new File([fileUrl], "contract.docx", {
  //       type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //     });
  //     setFile(docObject);
  //   }
  // }, [fileBlob]);

  // const [fileUrl, setFileUrl] = useState<string | null>(null);

  // console.log('fileurl', fileUrl)
  // console.log('file', file)

  // useEffect(() => {
  //   if (fileUrl) {
  //     // Создаем временный URL для Blob
  //     // const url = URL.createObjectURL(file);
  //     setFileUrl(url);

  //     console.log('url', url)

  //     // Очищаем URL после размонтирования компонента
  //     return () => URL.revokeObjectURL(url);
  //   }
  // }, [fileUrl]);

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

  if (isLoading) return <p>Loading file...</p>;
  if (error) return <p>Error loading file</p>;

  // console.log("file", file);

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

          <FileWordOutlined style={{ fontSize: '100px', color: '#08c' }} />
          </Flex>
          <div>
            <h1>{contract.document_name}</h1>
            <h2>
              {contract.customer} & {contract.supplier}
            </h2>
          </div>
        </Flex>
      ))}
      {/* <div>
        {fileUrl ? (
          <DocViewer
            documents={[{ uri: fileUrl }]} // Передаем временный URI
            pluginRenderers={DocViewerRenderers}
            style={{ width: "100%", height: "800px" }}
          />
        ) : (
          <p>No file available</p>
        )}
      </div> */}
    </Flex>
  );
};

export default Contracts;
