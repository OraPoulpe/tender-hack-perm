"use client";

import { IMessagePops } from "@/src/shared/interfaces/message";
import { Button, DatePicker, Flex, Input, Typography } from "antd";
import React, { FC, useState } from "react";

const Message: FC<IMessagePops> = ({
  created_datetime,
  from,
  type,
  id,
  buttons,
  input,
  text,
  disabled = false,
  handleNewAction,
  placeholder,
  table,
}) => {
  const { Text, Paragraph, Link } = Typography;
  const [textInputMessage, setTextInputMessage] = useState<string>("");

  const handleSendInputMessage = () => {
    handleNewAction("*" + textInputMessage);
    disabled = true
    // setTextInputMessage('')
  };
  

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.ctrlKey) {
        return;
      } else {
        e.preventDefault();

        handleSendInputMessage();
      }
    }
  };

  return (
    <div
      className={`flex w-3/4 flex-col gap-2 rounded-2xl p-4 ${from === "user" ? "self-end bg-blue-100" : "bg-slate-200"}`}
    >
      {/* <Text>{from === 'system' ? "Bot" : "Пользователь"}</Text> */}
      <Paragraph>{text}</Paragraph>

      {type === "form" && buttons && (
        <Flex vertical gap={8} className="w-full">
          {/* {buttons.map((buttonsRow, key) => (
            <Flex  gap={8} key={key}>
              {buttonsRow.map((button, key) => (
                <Button
                  disabled={disabled}
                  className="w-full flex-1"
                  type="primary"
                  size="large"
                  key={key}
                >
                  {button.text}
                </Button>
              ))}
            </Flex>
          ))} */}

          {buttons.map((button, key) => (
            <Button
              disabled={disabled}
              className="w-full flex-1"
              type="primary"
              size="large"
              key={key}
              onClick={() => handleNewAction(String(button.to))}
            >
              {button.text}
            </Button>
          ))}
        </Flex>
      )}
      {type === "input" && from !== "user" && (
        <Flex gap={8} className="w-full">
          {/* {input.type === "text" ? (
            <Input
              disabled={disabled}
              placeholder={input.placeholder}
              onChange={(e) => setTextInputMessage(e.target.value)}
            />
          ) : (
            <DatePicker
              disabled={disabled}
              placeholder={input.placeholder}
              onChange={(_, dateString) => setTextInputMessage(dateString)}
            />
          )} */}
          <Input
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => setTextInputMessage(e.target.value)}
            value={textInputMessage}
            // onKeyDown={(e:)=>handleKeyPress(e)}
          />

          <Button type="primary" disabled={disabled} onClick={handleSendInputMessage}>
            Сохранить
          </Button>
        </Flex>
      )}
      <Text className={` ${from === "user" ? "self-end" : "self-start"}`} type="secondary">
        {created_datetime && created_datetime.slice(11, 16)}
      </Text>
    </div>
  );
};

export default Message;
