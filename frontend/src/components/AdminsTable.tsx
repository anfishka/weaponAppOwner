import React, { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import { fetchAdmins, Admin } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AdminsTable: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); 

  const handleSelectAdmin = (adminId: number) => {
    // Навигация на страницу Workloads с параметром ID
    console.log("ok")
    navigate(`/workloads/${adminId}`);
    console.log("ok")
  };
  const handleEditAdmin = (adminId: number) => {
    navigate(`/settings/${adminId}`); // Перенаправление на страницу редактирования
  };

 

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const data = await fetchAdmins(); // Вызов API
        setAdmins(data);
      } catch (error: any) {
        message.error(`Ошибка загрузки данных: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadAdmins();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id"},
    { title: "Имя", dataIndex: "first_name", key: "first_name" },
    { title: "Фамилия", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Кол-во карточек", dataIndex: "card_count", key: "card_count" },
    {
      title: "Активация",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive: boolean) => (
        <span
          style={{
            color: isActive ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {isActive ? "Активен" : "Неактивен"}
        </span>
      ),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: Admin) => (
        <Button
          type="primary"
          style={{
            backgroundColor: "#BC4A00",
            border: "none",
          }}
          onClick={() => handleEditAdmin(record.id)} // Передаём ID в handleEditAdmin
        >
          Редактировать
        </Button>
      ),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: Admin) => (
        <Button
          type="primary"
          style={{
            backgroundColor: "rgb(0, 100, 80)",
            border: "none",
          }}
          onClick={() => handleSelectAdmin(record.id)} // Use record.id instead of admin.id
        >
           Выбрать
          
        </Button>
      ),
    }
 
  ];
 
  return <Table dataSource={admins} columns={columns} loading={loading} rowKey="id" />;
};

export default AdminsTable;
