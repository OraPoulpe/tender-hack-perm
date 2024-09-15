"use client";
import { ChatInput } from "@/src/features/chat/chatInput";
import { Message } from "@/src/features/chat/message";
import { IMessage } from "@/src/shared/interfaces/message";
import { Button, Flex, message, Skeleton } from "antd";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import "./Chat.scss";

import { useGetUserMeQuery } from "@/src/shared/api/user/userApi";
import { FileWordOutlined } from "@ant-design/icons";
import { ContractPreview } from "@/src/features/contract/contractPreview";

const Chat: FC = () => {
  const { data: userMe, isLoading } = useGetUserMeQuery();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  // Открываем WebSocket соединение при монтировании компонента
  useEffect(() => {
    if (userMe?.id) {
      socketRef.current = new WebSocket(
        `wss://acmenra.tech/api/agreements/chat?user_id=${userMe?.id}`
      );

      socketRef.current.onopen = () => {
        console.log("WebSocket соединение установлено");
      };

      socketRef.current.onmessage = (event) => {
        // Получение сообщений через WebSocket
        const dataMessage = JSON.parse(event.data);
        console.log("dataMessage", dataMessage);
        if (Array.isArray(dataMessage)) {
          setMessages(dataMessage);
        } else {
          setMessages((prevMessages) => [...prevMessages, dataMessage]);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("Ошибка WebSocket соединения:", error);
      };

      // Закрытие соединения при размонтировании компонента
      return () => {
        socketRef.current?.close();
      };
    }
  }, [userMe?.id]);

  // Функция отправки нового сообщения

  const handleSendNewMessage = (textNewMessage: string) => {
    if (textNewMessage.length > 0 && messages) {
      const message: IMessage = {
        text: textNewMessage,
        created_datetime: Date(),
        from: "user",
        type: "form",
        id: messages[messages.length - 1].id + 1,
      };

      setMessages((prevMessages) => [...prevMessages, message]);

      if (socketRef.current) {
        socketRef.current.send(textNewMessage);
      }
      scrollDown();

      // if (userId !== undefined) {
      //   trigger(userId);

      //   // sendMessage({ message: textNewMessage, userId });
      // }
    }
  };

  const handleNewAction = (state: string) => {
    if (socketRef.current) {
      socketRef.current.send(state);
    }
  };

  const scrollDown = () => {
    const container = document.getElementById("chat_contanier");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollDown();
  }, [messages]);

  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  return (
    <Flex vertical justify="end" gap={15} className="h-screen w-full pb-4 pl-4">
      {isLoading ? (
        <>
          <Skeleton.Button active={true} size="large" block={true} />
          <Skeleton.Button active={true} size="large" block={true} />
          <Skeleton.Button active={true} size="large" block={true} />
        </>
      ) : (
        // <Flex>
        //   <Button onClick={() => setIsPreviewOpen(!isPreviewOpen)} icon={<FileWordOutlined />}>
        //     Договор
        //   </Button>
        //   {isPreviewOpen && <ContractPreview />}
          <div
            id="chat_contanier"
            className="scrollbar-thumb-blue flex w-full flex-col gap-4 overflow-y-scroll pr-4 pt-4 scrollbar-thin scrollbar-track-transparent"
          >
            {messages !== undefined &&
              messages.map((message, key) => {
                if (message.text[0] !== "*") {
                  return (
                    <Message
                      key={key}
                      type={message.type}
                      text={message.text}
                      buttons={message.buttons}
                      // input={message.input}
                      created_datetime={message.created_datetime}
                      from={message.from}
                      id={message.id}
                      handleNewAction={handleNewAction}
                      placeholder={message.placeholder}
                      disabled={messages.length !== key + 1}
                    />
                  );
                }
              })}
          </div>
        // </Flex>
      )}

      <ChatInput isLoading={isLoading} handleSendNewMessage={handleSendNewMessage} />
    </Flex>
  );
};

export default Chat;
