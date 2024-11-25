import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Row, Col, Typography, Switch, message } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

const { Text } = Typography;

const apiUrl = process.env.REACT_APP_API_URL;


const AdminAccountManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получение ID из маршрута
  const [isActive, setIsActive] = useState(true); // Состояние активности
  const [isEditing, setIsEditing] = useState(false); // Управление режимом редактирования
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [adminData, setAdminData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    is_active: true,
  }); // Данные администратора

  // Загрузка данных администратора
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://weaponadminapi20241125032218.azurewebsites.net/api/admins/${id}`);
        setAdminData(response.data);
        setIsActive(response.data.is_active); // Установить начальное состояние Switch
      } catch (error: any) {
        message.error("Ошибка загрузки данных администратора.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true); // Включить режим редактирования
  };

  const handleSaveClick = async (values: any) => {
    try {
      setLoading(true);
  
      // Фильтруем только изменённые поля
      const patchDoc = Object.keys(values).reduce((acc: any[], key) => {
        const newValue = values[key as keyof typeof values];
        const oldValue = adminData[key as keyof typeof adminData];
  
        // Добавляем только те поля, которые изменились и не являются undefined
        if (newValue !== oldValue && newValue !== undefined) {
          acc.push({ op: "replace", path: `/${key}`, value: newValue });
        }
  
        return acc;
      }, []);
  
      // Добавляем изменение `is_active`, если оно поменялось
      if (isActive !== adminData.is_active) {
        patchDoc.push({ op: "replace", path: "/is_active", value: isActive });
      }
  
      // Проверяем, есть ли данные для отправки
      if (patchDoc.length === 0) {
        message.info("Нет изменений для сохранения.");
        console.log("Нет изменений для отправки.");
        console.log(loading)
        return;
      }
  
      console.log("Отправляем PATCH-запрос:", patchDoc);
  
      const response = await axios.patch(
        `https://weaponadminapi20241125032218.azurewebsites.net/api/Admins/${id}`,
        patchDoc,
        {
          headers: { "Content-Type": "application/json-patch+json" },
        }
      );
  
      console.log("Ответ от сервера:", response.data);
      message.success("Данные успешно сохранены!");
      setIsEditing(false); // Выход из режима редактирования
      setAdminData({ ...adminData, ...values }); // Обновляем локальные данные
    } catch (error: any) {
      console.error("Ошибка при сохранении данных:", error);
  
      if (error.response) {
        console.error("Детали ошибки от сервера:", error.response.data);
        message.error(`Ошибка: ${error.response.data.message || "Сохранение не удалось"}`);
      } else {
        message.error("Ошибка сети или сервера.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Card
      title="Управление учетной записью администратора"
      style={{
        backgroundColor: "rgb(0, 120, 95)",
        color: "white",
        borderRadius: 8,
      }}
    >
      <Form
        layout="vertical"
        onFinish={handleSaveClick} // Отправка данных формы
        initialValues={adminData}
      >
        <Row gutter={32}>
          {/* Левая часть: Статическая информация */}
          <Col span={12}>
            <Card
              bordered={false}
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Form.Item label={<Text style={{ color: "white", fontSize: 12 }}>ID</Text>}>
                <Text
                  style={{
                    color: "#BC4A00",
                    fontWeight: 600,
                    backgroundColor: "#eee",
                    padding: 8,
                    borderRadius: 5,
                    width: 180,
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {adminData.id}
                </Text>
              </Form.Item>

              <Form.Item label={<Text style={{ color: "white", fontSize: 12 }}>Имя</Text>}>
                <Text
                  style={{
                    color: "#000",
                    backgroundColor: "#eee",
                    padding: 8,
                    borderRadius: 5,
                    width: 180,
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {adminData.first_name}
                </Text>
              </Form.Item>

              <Form.Item label={<Text style={{ color: "white", fontSize: 12 }}>Фамилия</Text>}>
                <Text
                  style={{
                    color: "#000",
                    backgroundColor: "#eee",
                    padding: 8,
                    borderRadius: 5,
                    width: 180,
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {adminData.last_name}
                </Text>
              </Form.Item>
            </Card>
          </Col>

          {/* Правая часть: Динамическая информация */}
          <Col span={12}>
            <Form.Item
              label={<Text style={{ color: "white" }}>Логин</Text>}
              name="username"
              rules={[{ required: true, message: "Введите логин администратора" }]}
            >
              <Input
                placeholder="Введите логин"
                disabled={!isEditing} // Блокировка ввода, если не в режиме редактирования
                style={{
                  backgroundColor: isEditing ? "#1e1e1e" : "#f5f5f5",
                  color: isEditing ? "white" : "gray",
                }}
              />
            </Form.Item>

            <Form.Item
              label={<Text style={{ color: "white" }}>Пароль</Text>}
              name="password"
              rules={[{ required: true, message: "Введите пароль администратора" }]}
            >
              <Input.Password
                placeholder="Введите пароль"
                disabled={!isEditing} // Блокировка ввода
                style={{
                  backgroundColor: isEditing ? "#1e1e1e" : "#f5f5f5",
                  color: isEditing ? "white" : "gray",
                }}
              />
            </Form.Item>

            <Form.Item label={<Text style={{ color: "white" }}>Статус</Text>}>
              <Switch
                checked={isActive}
                onChange={(checked) => setIsActive(checked)}
                checkedChildren="Активен"
                unCheckedChildren="Неактивен"
                disabled={!isEditing} // Отключение переключателя, если не в режиме редактирования
                style={{
                  backgroundColor: isEditing
                    ? isActive
                      ? "#BC4A00"
                      : "rgb(0, 21, 41)"
                    : "#f5f5f5",
                  cursor: isEditing ? "pointer" : "not-allowed",
                }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={handleEditClick}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#BC4A00",
                    border: "none",
                  }}
                >
                  Редактировать
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#BC4A00",
                    border: "none",
                  }}
                  disabled={!isEditing} // Блокировка кнопки, если не в режиме редактирования
                >
                  Сохранить
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AdminAccountManagement;
