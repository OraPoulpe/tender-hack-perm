import { DownloadOutlined, FileWordOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";

interface IFileMessageProps {
  name_file: string;
}

const FileMessage: FC = () => {
  const [fileBlobUrl, setFileBlobUrl] = useState<string | null>(null);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://acmenra.tech/api/contracts/agreements/get/6/document`
        );
        if (!response.ok) {
          throw new Error("Ошибка при получении файла");
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setFileBlobUrl(blobUrl);
        setFileBlob(blob); // Сохраняем Blob для дальнейшей загрузки
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, []);

  const downloadFile = () => {
    if (fileBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(fileBlob);
      link.download = `document.docx`; // Устанавливаем имя файла
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Если файл не удалось получить с сервера, скачиваем дефолтный файл
      const link = document.createElement("a");
      link.href = "/agreement.docx"; // URL до статического файла
      link.download = `default_document.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-slate-200} flex w-3/4 flex-col gap-2 rounded-2xl p-4">
      <FileWordOutlined style={{ fontSize: "32px", color: "#08c" }} />
      {/* <Typography>{name_file}</Typography> */}
      <Button icon={<DownloadOutlined />} onClick={downloadFile} />
    </div>
  );
};

export default FileMessage;
