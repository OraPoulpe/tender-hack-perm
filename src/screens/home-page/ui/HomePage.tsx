"use client"

import { Chat } from "@/src/widgets/chat";
import { Flex } from "antd";
import React from "react";
//vertical={window?.innerWidth < 500}
const HomePage = () => {
  return (
    <Flex  className="h-screen w-full">
      {/* <Image /> */}
      {/* <div className="bg-red-400 w-1/2 h-full" /> */}
      <Chat />
    </Flex>
  );
}; 

export default HomePage;
