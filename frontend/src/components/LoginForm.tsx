import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;



const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/AdminAuth/login`, values, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, admin } = response.data;
      login(token, { id: admin.id, name: admin.username }); // Передача токена и данных пользователя
      message.success("Успешный вход!");
    } catch (error: any) {
      console.error("Ошибка входа:", error);
      message.error("Неверное имя пользователя или пароль.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleLogin}>
      <Form.Item name="username" rules={[{ required: true, message: "Введите имя пользователя!" }]}>
        <Input placeholder="Имя пользователя" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "Введите пароль!" }]}>
        <Input.Password placeholder="Пароль" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
