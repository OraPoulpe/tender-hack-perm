import { DownloadOutlined, FileWordOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { FC } from "react";

interface IFileMessageProps {
    name_file: string;
}

const FileMessage: FC<IFileMessageProps> = ({name_file}) => {
  return <div className={`w-3/4 h-20 flex gap-3 rounded-2xl bg-slate-200 p-4`}>
    <FileWordOutlined style={{ fontSize: '32px', color: '#08c' }} />
    <Typography>{name_file}</Typography>
    <Button icon={<DownloadOutlined />}/>
  </div>;
};

export default FileMessage;
