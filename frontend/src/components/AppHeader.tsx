import React, { useState } from "react";
import { Layout, Input, Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { searchAdmins, Admin } from "../utils/api";

const { Header } = Layout;

const AppHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  const [searchText, setSearchText] = useState<string>(""); // Текст ввода
  const [searchResults, setSearchResults] = useState<Admin[]>([]); // Результаты поиска
  const [loading, setLoading] = useState<boolean>(false); // Индикатор загрузки
  const navigate = useNavigate(); // Для навигации между страницами

  // Функция поиска администраторов
  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]); // Очищаем результаты, если запрос пустой
      return;
    }

    try {
      setLoading(true);
      const results = await searchAdmins(query); // Вызов API
      setSearchResults(results);
    } catch (error: any) {
      message.error(error.response?.data?.message || "Ошибка поиска.");
      setSearchResults([]); // Очищаем результаты при ошибке
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменения текста поиска (автопоиск)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value); // Обновление текста
    fetchSearchResults(value); // Выполняем поиск
  };

  // Обработчик нажатия кнопки "Поиск"
  const handleSearchClick = () => {
    fetchSearchResults(searchText); // Выполняем поиск
  };

  const handleSelectAdmin = (adminId: number) => {
    // Навигация на страницу Workloads с параметром ID
    console.log("ok")
    navigate(`/workloads/${adminId}`);
    console.log("ok")
  };


  const handleLogout = () => {
    localStorage.removeItem("authToken");
  //  setAuthenticated(false);
    navigate("/login");
  };
  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#BC4A00",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Weapon - Owner Panel
        </div>
        <Button onClick={handleLogout}>Выйти</Button>
        {/* Поле поиска с кнопкой */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Spin spinning={loading}>
            <Input
              placeholder="Поиск администраторов (ID, Имя, Логин, Email)"
              size="middle"
              value={searchText}
              onChange={handleInputChange} // Автопоиск при вводе текста
              style={{ maxWidth: 400 }}
            />
          </Spin>
          <Button
            type="primary"
            style={{
              backgroundColor: "rgb(0, 120, 95)",
              border: "none",
            }}
            onClick={handleSearchClick} // Поиск при нажатии на кнопку
          >
            Поиск
          </Button>
        </div>
      </Header>

      {/* Результаты поиска */}
      <div style={{ padding: "20px" }}>
        <h3>Результаты поиска:</h3>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((admin) => (
              <li
                key={admin.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div>
                  ID: {admin.id}, Имя: {admin.first_name} {admin.last_name}, Логин: {admin.username}, Email: {admin.email}
                </div>
                <Button
      type="primary"
      onClick={() => handleSelectAdmin(admin.id)} // Пример ID администратора
      style={{
        backgroundColor: "rgb(0, 120, 95)",
        border: "none",
      }}
    >
      Выбрать
    </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
      <div style={{ flex: 1, display: "flex" }}>{children}</div>
    </div>
  );
};

export default AppHeader;
