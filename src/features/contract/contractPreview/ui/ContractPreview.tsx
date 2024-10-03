import React, { FC, useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const ContractPreview: FC = () => {
  const [fileBlobUrl, setFileBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://acmenra.tech/api/contracts/get/${1}/document`);
        if (!response.ok) {
          throw new Error("Ошибка при получении файла");
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setFileBlobUrl(blobUrl);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, []);

  if (loading) return <p>Загрузка документа...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="w-1/2">
      <></>
      {fileBlobUrl ? (
        <DocViewer documents={[{ uri: fileBlobUrl }]} pluginRenderers={DocViewerRenderers} />
      ) : (
        <p>Не удалось загрузить документ</p>
      )}
    </div>
  );
};

export default ContractPreview;
