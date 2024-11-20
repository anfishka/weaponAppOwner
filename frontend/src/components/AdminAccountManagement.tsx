import React, { useState } from "react";
import { Form, Input, Button, Card, Row, Col, Typography, Switch } from "antd";

const { Text } = Typography;

const AdminAccountManagement: React.FC = () => {
  const [isActive, setIsActive] = useState(true); // Состояние активности
  const [isEditing, setIsEditing] = useState(false); // Управление режимом редактирования

  const handleEditClick = () => {
    setIsEditing(true); // Включить режим редактирования
  };

  const handleSaveClick = (values: any) => {
    console.log("Сохраненные данные:", values); // Данные из формы
    setIsEditing(false); // Отключить режим редактирования
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
      initialValues={{
        login: "admin", // Предустановленные значения
        password: "12345",
      }}
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
              {/* Поле для отображения ID */}
              <Form.Item label={<Text style={{ color: "white", fontSize:12 }}>ID</Text>}>
                <Text style={{ color: "#BC4A00", fontWeight:600, backgroundColor:"#eee", padding:8, borderRadius:5,  width: 180, display: "inline-block",textAlign: "center"}}>12345</Text>
              </Form.Item>

              {/* Поле для отображения имени */}
              <Form.Item label={<Text style={{ color: "white",  fontSize:12 }}>Имя</Text>}>
                <Text style={{ color: "#000", backgroundColor:"#eee", padding:8, borderRadius:5,  width: 180, display: "inline-block",textAlign: "center" }}>Марина</Text>
              </Form.Item>

              {/* Поле для отображения фамилии */}
              <Form.Item label={<Text style={{ color: "white",  fontSize:12 }}>Фамилия</Text>}>
                <Text style={{ color: "#000", backgroundColor:"#eee", padding:8, borderRadius:5,  width: 180, display: "inline-block",textAlign: "center" }}>Ивановa</Text>
              </Form.Item>

              {/* Количество карточек */}
              <Form.Item label={<Text style={{ color: "white", fontSize:12 }}>Карточки</Text>}>
                <Text style={{ color: "#BC4A00", fontWeight:600, backgroundColor:"#eee", padding:8, borderRadius:5,  width: 180, display: "inline-block",textAlign: "center" }}>15</Text>
              </Form.Item>
            </Card>
          </Col>

          {/* Правая часть: Динамическая информация */}
          <Col span={12}>
            {/* Поле логина (редактируемое) */}
            <Form.Item
                className="editInput"
              label={<Text style={{ color: "white" }}>Логин</Text>}
              name="login"
              rules={[
                { required: false, message: "Введите логин администратора" },
              ]}
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

            {/* Поле пароля (редактируемое) */}
            <Form.Item
            className="editInput"
              label={<Text style={{ color: "white" }}>Пароль</Text>}
              name="password"
              rules={[
                { required: false, message: "Введите пароль администратора" },
              ]}
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
          ? "#BC4A00" // Цвет активного статуса в режиме редактирования
          : "rgb(0, 21, 41)" // Цвет неактивного статуса в режиме редактирования
        : "#f5f5f5", // Блокированный серый фон
      cursor: isEditing ? "pointer" : "not-allowed", // Изменение курсора
    }}
  />
</Form.Item>
            <Row gutter={16}>
        <Col span={12}>
          <Button
            type="primary"
            htmlType="button"
            onClick={handleEditClick} // Включить режим редактирования
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
