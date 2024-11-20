import React from "react";
import { Button, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

interface Admin {
  key: string;
  id: number;
  name: string;
  email: string;
  cards: number;
  status: string;
}

const AdminsTable: React.FC = () => {
  const navigate = useNavigate();
  // Данные администраторов
  const data = [
    {
      key: "1",
      id: 1,
      name: "Иван Иванов",
      email: "ivan@mail.com",
      cards: 10,
      status: "Доступен",
    },
    {
      key: "2",
      id: 2,
      name: "Анна Сидорова",
      email: "anna@mail.com",
      cards: 7,
      status: "Недоступен",
    },
    {
        key: "2",
        id: 2,
        name: "Анна Сидорова",
        email: "anna@mail.com",
        cards: 7,
        status: "Недоступен",
      }, {
        key: "3",
        id: 3,
        name: "Анна Сидорова",
        email: "anna@mail.com",
        cards: 7,
        status: "Недоступен",
      },
    {
      key: "3",
      id: 3,
      name: "Петр Петров",
      email: "petr@mail.com",
      cards: 15,
      status: "Доступен",
    },
  ];

  // Колонки таблицы
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center" as const,
      render: (text: string) => <span style={{ color: "#BC4A00" }}>{text}</span>,
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Карточки",
      dataIndex: "cards",
      key: "cards",
      align: "center" as const,
      render: (cards: number) => (
        <span style={{ color: "rgb(0, 120, 95)" }}>{cards}</span>
      ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string) => (
        <Tag
          color={status === "Доступен" ? "green" : "red"}
          style={{
            backgroundColor:
              status === "Доступен" ? "rgb(0, 120, 95)" : "#BC4A00",
            color: "white",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Действие", // Добавляем колонку
      key: "action",
      render: (_: unknown, record: Admin) => (
        <Button
          type="primary"
          style={{
            backgroundColor: "#BC4A00",
            border: "none",
          }}
          onClick={() => navigate(`/workloads/${record.id}`, { state: record })} // Переход с передачей данных
        >
          Показать
        </Button>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#252525", padding: "20px" }}>
      <h2 style={{ color: "rgb(0, 120, 95)", marginBottom: "20px" }}>
        Таблица администраторов
      </h2>
      <Table
        dataSource={data}
        columns={columns}
        bordered
        style={{
          backgroundColor: "#001529", // Фон таблицы
          borderColor: "#BC4A00", // Границы таблицы
        }}
        pagination={{ pageSize: 5 }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
      />
    </div>
  );
};

export default AdminsTable; 