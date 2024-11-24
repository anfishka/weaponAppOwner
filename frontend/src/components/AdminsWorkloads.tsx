import React, { useEffect, useState } from "react";
import { Table, Button, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
  is_visible: boolean;
  updatedAt?: string;
  createdAt?: string;
  adminId: number;
}


const apiUrl = "https://gentle-tree-06ebec603.5.azurestaticapps.net"

const AdminsWorkloads: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получение adminId из URL
  const [data, setData] = useState<Product[]>([]); // Данные для таблицы
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки
  const handleViewProduct = (productId: number) => {
    // Здесь укажите URL клиента

    //FRONTEND???????????????
    const clientUrl = `${apiUrl}/frontend/product/${productId}`;
    window.open(clientUrl, "_blank"); // Перенаправление на клиент
  };
  useEffect(() => {
    // Получение данных от API
    const fetchProductsByAdmin = async () => {
      try {
        const response = await axios.get<Product[]>(
         
          `${apiUrl}/api/Products/by-admin/${id}`
        );
        setData(response.data);
      } catch (err: any) {
        setError("Ошибка загрузки данных администратора.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductsByAdmin();
  }, [id]);

  // Колонки таблицы
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <span style={{ color: "#BC4A00" }}>{text}</span>,
    },
    {
      title: "Название оружия",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Категория",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Дата добавления",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "N/A",
    },
    {
      title: "Дата редактирования",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "N/A",
    },
    {
      title: "Действие",
      key: "action",
      render: (_: any, record: { id: number }) => (
        <Button
          type="primary"
          style={{
            backgroundColor: "#BC4A00",
            border: "none",
          }}
          onClick={() => handleViewProduct(record.id)} // Обработчик для кнопки
        >
          Посмотреть
        </Button>
      ),
    },
  ];

  // Состояние загрузки
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Spin tip="Загрузка данных..." size="large" />
      </div>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Alert message="Ошибка" description={error} type="error" showIcon />
      </div>
    );
  }

  // Отрисовка таблицы или сообщения, если данных нет
  return (
    <div style={{ padding: "20px", backgroundColor: "#001529", color: "white" }}>
      <h2 style={{ color: "rgb(0, 120, 95)", marginBottom: "20px" }}>
        Нагрузки администратора: {id}
      </h2>
      {data.length > 0 ? (
        <Table
          dataSource={data}
          columns={columns}
          bordered
          pagination={{ pageSize: 5 }}
          style={{ backgroundColor: "#252525" }}
        />
      ) : (
        <p style={{ color: "white", textAlign: "center" }}>
          Нет данных для администратора с ID: {id}
        </p>
      )}
    </div>
  );
};

export default AdminsWorkloads;
