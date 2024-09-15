"use client";

import { IMessage, IMessagePops } from "@/src/shared/interfaces/message";
import { SendOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import React, { FC, useState } from "react";

interface IChatInputProps {
  disabled?: boolean;
  isLoading: boolean;
  handleSendNewMessage: (newMessage: string) => void;
}

const ChatInput: FC<IChatInputProps> = ({ disabled = false, handleSendNewMessage, isLoading }) => {
  const [textMessage, setTextMessage] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.ctrlKey) {
        return;
      } else {
        e.preventDefault();

        handleSendNewMessage(textMessage);
        setTextMessage("");
      }
    }
  };

  const handleClickSendButton = () => {
    handleSendNewMessage(textMessage);
    setTextMessage("");
  };

  return (
    <Flex className="mx-4 w-full justify-between self-end" gap={10} align="end">
      <Input.TextArea
        disabled={disabled || isLoading}
        placeholder="введите свой запрос"
        size="large"
        onChange={(e) => setTextMessage(e.target.value)}
        className="w-3/4 shadow"
        autoSize={{ minRows: 1, maxRows: 5 }}
        onKeyDown={handleKeyPress}
        // defaultValue={textMessage}
        value={textMessage}
      />
      <Button
        loading={isLoading}
        disabled={disabled}
        onClick={handleClickSendButton}
        size="large"
        className="shadow"
        icon={<SendOutlined />}
      />
    </Flex>
  );
};

export default ChatInput;
