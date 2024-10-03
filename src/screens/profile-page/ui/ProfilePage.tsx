import { useGetUserMeQuery } from "@/src/shared/api/user/userApi";
import { Button, Skeleton, Typography } from "antd";
import { signOut } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: userMe, isLoading } = useGetUserMeQuery();

  console.log("userMe", userMe)

  if (isLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton.Button />
      </>
    );
  } else {
    return (
      <div className="p-10">
        <Typography.Title level={3}>
          ФИО: {userMe?.lastname} {userMe?.firstname} {userMe?.surname}{" "}
        </Typography.Title>
        <Typography.Title level={4}>Почта: {userMe?.email}</Typography.Title>
      </div>
    );
  }
};

export default ProfilePage;
