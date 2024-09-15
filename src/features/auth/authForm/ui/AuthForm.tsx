"use client";

import { useLoginUserMutation } from "@/src/shared/api/user/userApi";
import { TLoginData } from "@/src/shared/interfaces/user";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [isButtonDisable, setButtonDisable] = useState<boolean>(false);

  const router = useRouter();

  const errorMassage = () => {
    messageApi.open({
      type: "error",
      content: "Неправильный логин или пароль",
    });
  };
  const successMassage = () => {
    messageApi.open({
      type: "success",
      content: "Вы авторизованны",
    });
  };

  useEffect(() => {
    setButtonDisable(true);
  }, []);
  const searchParams = useSearchParams();

  const [loginUser, { isLoading, isError, error, isSuccess, status }] = useLoginUserMutation();

  const handleLoginFinish = async (values: TLoginData) => {
    try {
      const res = await loginUser(values);
      const formData = new FormData();

      formData.append("username", values.username);
      formData.append("password", values.password);

      const callbackUrl = searchParams.get("callbackUrl") || "/profile";

      if ("error" in res) {
        errorMassage();
        form.setFields([
          {
            name: "password",
            errors: ["Неправильный логин или пароль"],
          },
          {
            name: "username",
            errors: ["Неправильный логин или пароль"],
          },
        ]);
      } else if ("data" in res) {
        successMassage();
        form.resetFields();
        await signIn("credentials", {
          email: formData.get("username"),
          password: formData.get("password"),
          redirect: false,
          callbackUrl: callbackUrl,
        });
        router.prefetch("/chat");
        router.push("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-80">
      {contextHolder}

      <Form form={form} name="login" layout="vertical" onFinish={handleLoginFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Обязательное поле" }]}>
          <Input placeholder="Имя пользователя" size="large" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Обязательное поле" }]}>
          <Input.Password
            placeholder="Пароль"
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => (
            <Button
              loading={isLoading}
              type="primary"
              style={{ width: "100%" }}
              size="large"
              htmlType="submit"
              // loading={isLoading}
            >
              Войти
            </Button>
          )}
        </Form.Item>
      </Form>
    </section>
  );
};

export default AuthForm;
