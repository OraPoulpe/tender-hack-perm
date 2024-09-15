"use client";

import {
  FileWordOutlined,
  LogoutOutlined,
  MessageOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { Content } from "antd/es/layout/layout";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModalSign = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    signOut({ callbackUrl: "/login" });
    setIsModalOpen(false);
  };

  const session = useSession();
  console.log("sess", session);

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: `Профиль`,
      onClick: () => {
        router.prefetch("/profile");
        router.push("/profile");
      },
    },
    {
      key: "contract",
      icon: <FileWordOutlined />,
      label: `Документы`,
      onClick: () => {
        router.prefetch("/contract");
        router.push("/contract");
      },
    },
    {
      key: "chats",
      icon: <MessageOutlined />,
      label: `Чат`,
      children: [
        {
          key: "chatBot",
          label: "Чат с ботом",
          icon: <RobotOutlined />,
          onClick: () => {
            router.prefetch("/chat");
            router.push("/chat");
          },
        },
        { key: "chatUser", label: "Чат", icon: <UserOutlined /> },
      ],
    },
    {
      key: "signout",
      icon: <LogoutOutlined />,
      label: "Выйти",
      onClick: showModalSign,
    },
  ];

  if (session.status === "unauthenticated") {
    return <main className="flex h-full w-full items-center justify-center">{children}</main>;
  } else {
    return (
      <Layout className="flex h-screen w-full items-center justify-center overflow-hidden">
        <Sider
          className="h-full bg-white"
          breakpoint="lg"
          collapsedWidth="0"
          // theme="light"
          // onBreakpoint={(broken) => {
          //   console.log(broken);
          // }}
          // onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type);
          // }}
        >
          {/* <div className="demo-logo-vertical" /> */}
          <Content style={{ margin: "25px", overflow: "initial" }}>
            <Image
              width={180}
              height={0}
              className=""
              src={
                "https://zakupki.mos.ru/static/media/pp_logo.80b7ad86dad21f1f5a4d3d170bfb13be.svg"
              }
              alt="Портал поставщиков"
              onClick={() => router.push("https://zakupki.mos.ru/")}
            />
          </Content>
          <Menu mode="inline" className="mt-5 h-full" items={items} />
        </Sider>
        <Layout className=" bg-slate-100 h-screen w-full">{children}</Layout>
        <Modal title="Выход" cancelText={'Выйти'} okText={'Остаться'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>Вы уверены, что хотите выйти?</Modal>
      </Layout>
    );
  }
}
